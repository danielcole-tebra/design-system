// Explicit writable targets. Source and deprecated libraries are never accepted.
const targets = {
  fdCQVFdvOByaOYIJYag0d6: ['0:1 Cover', '3:2 Templates', '27:2 Screens', '126:2 Archive'],
  YX2n4YLrEpBXNbcc73T6dw: ['118:250 Cover', '145:2 Foundations', '259:2879 Reference', '259:2873 Actions', '259:2874 Inputs', '259:2875 Data display', '259:2876 Feedback', '259:2877 Surfaces & navigation', '259:2878 Icons & illustrations', '446:2 Compositions', '489:2 Layouts']
};
function validateTargetIdentity(target, evidence) {
  const pages = targets[target?.fileKey];
  if (!pages || evidence?.fileKey !== target.fileKey) throw new Error('target file identity mismatch');
  if (JSON.stringify(evidence.pages) !== JSON.stringify(pages)) throw new Error('target page inventory mismatch');
}
module.exports = { validateTargetIdentity };
