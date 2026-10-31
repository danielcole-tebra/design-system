// Paste createSearchRunner into the orchestration runtime, not into Figma.
// Schema checked against component/variable/style responses on 2026-10-31.
function createSearchRunner(searchTool, put, get) {
  if (![searchTool, put, get].every(fn => typeof fn === 'function')) throw new Error('Supply search tool, store and load');
  function decode(raw) {
    if (raw?.isError) throw new Error('Search tool reported an error; inspect retained response');
    if (raw?.structuredContent?.results) return raw.structuredContent;
    if (Array.isArray(raw?.results)) return raw;
    const texts = raw?.content?.filter(item => item.type === 'text') ?? [];
    if (texts.length !== 1) throw new Error('Unrecognized search response envelope');
    return JSON.parse(texts[0].text);
  }
  function assets(entry, query) {
    if (entry?.entity !== query.entity || entry.query !== query.query) throw new Error('Search query order/schema changed');
    const field = { component: 'components', variable: 'variables', style: 'styles' }[entry.entity];
    if (!Array.isArray(entry[field])) throw new Error('Unrecognized asset collection');
    return entry[field];
  }
  function asset(value, entity, index) {
    const type = entity === 'component' ? value.assetType : entity;
    const key = entity === 'component'
      ? type === 'component_set' ? value.componentSetKey : type === 'component' ? value.componentKey : undefined
      : value.key;
    for (const item of [value.name, key, value.libraryKey]) {
      if (typeof item !== 'string' || !item || item.length > 512) throw new Error('Missing or oversized asset identity');
    }
    return { index, name: value.name, key, type, libraryKey: value.libraryKey };
  }
  function page(cacheKey, { queryIndex, offset = 0 } = {}) {
    const saved = get(cacheKey);
    if (!saved) throw new Error('Search cache missing; do not invent results');
    try {
      const data = decode(saved.raw), queries = saved.args.queries;
      if (!Array.isArray(data.results) || data.results.length !== queries.length) throw new Error('Search result count/schema changed');
      if (!Number.isSafeInteger(offset) || offset < 0 || (queryIndex === undefined && offset !== 0) ||
          (queryIndex !== undefined && (!Number.isSafeInteger(queryIndex) || queryIndex < 0 || queryIndex >= queries.length))) throw new Error('Invalid query page');
      const output = { status: 'ok', cacheKey, results: [] };
      for (const [i, query] of queries.entries()) {
        if (queryIndex !== undefined && queryIndex !== i) continue;
        const values = assets(data.results[i], query);
        if (offset > values.length) throw new Error('Offset exceeds retained matches');
        const group = { queryIndex: i, entity: query.entity, query: query.query,
          total: values.length, offset, shown: 0, omitted: values.length, nextOffset: null, candidates: [] };
        output.results.push(group);
        for (let j = offset; j < Math.min(offset + 5, values.length); j++) {
          group.candidates.push(asset(values[j], query.entity, j));
          if (JSON.stringify(output).length > 9500) { group.candidates.pop(); break; }
        }
        group.shown = group.candidates.length;
        group.omitted = group.total - group.shown;
        group.nextOffset = offset + group.shown < group.total ? offset + group.shown : null;
      }
      // Preserve every query's counts even when later groups get no candidates.
      while (JSON.stringify(output).length > 12000) {
        const group = [...output.results].reverse().find(item => item.candidates.length);
        if (!group) throw new Error('Narrow the query batch');
        group.candidates.pop(); group.shown--; group.omitted++; group.nextOffset = group.offset + group.shown;
      }
      return output;
    } catch (error) {
      return { status: 'needs-inspection', cacheKey, message: String(error.message).slice(0,200),
        note: 'Full response retained. Unknown schema is not an empty search.' };
    }
  }
  return {
    async search(args, cacheKey) {
      if (typeof cacheKey !== 'string' || !cacheKey || cacheKey.length > 120 || get(cacheKey) !== undefined) throw new Error('Use a fresh bounded cache key');
      if (typeof args?.fileKey !== 'string' || !args.fileKey || !Array.isArray(args.queries) ||
          args.queries.length < 1 || args.queries.length > 20 || args.queries.some(q =>
            !['component','variable','style'].includes(q.entity) || typeof q.query !== 'string' || !q.query || q.query.length > 200)) throw new Error('Invalid search arguments');
      const raw = await searchTool(args);
      put(cacheKey, { args, raw }); // Retain before parsing; never emit raw results.
      return page(cacheKey);
    },
    page,
    select(cacheKey, queryIndex, index) {
      const saved = get(cacheKey);
      if (!saved || !Number.isSafeInteger(queryIndex) || !Number.isSafeInteger(index) || index < 0) throw new Error('Invalid selection');
      const query = saved.args.queries[queryIndex];
      if (!query) throw new Error('Unknown query');
      const values = assets(decode(saved.raw).results[queryIndex], query);
      if (!values[index]) throw new Error('Unknown candidate');
      return asset(values[index], query.entity, index); // Exact stored key, no retyping.
    }
  };
}
if (typeof module !== 'undefined') module.exports = { createSearchRunner };
