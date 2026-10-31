/**
 * createComponentWithVariants
 *
 * Creates a component set by generating all combinations of `variantAxes`,
 * building one Figma component per combination, then calling
 * `figma.combineAsVariants` to produce the component set. After combining,
 * the variants are repositioned into a grid so they don't all stack at (0, 0).
 *
 * @param {{
 *   name: string,
 *   description?: string,
 *   variantAxes: Record<string, string[]>,
 *   baseProps: {
 *     width: number,
 *     height: number,
 *     fills?: Paint[],
 *     padding?: {top?: number, bottom?: number, left?: number, right?: number},
 *     radius?: number,
 *     layoutMode?: 'HORIZONTAL' | 'VERTICAL' | 'NONE',
 *     itemSpacing?: number
 *   },
 *   page: PageNode
 * }} config
 *   - `name`: Component set name (e.g. "Button").
 *   - `description`: Optional human-readable purpose and usage guidance.
 *   - `variantAxes`: Each key is a variant property name; each value is an array of
 *     allowed values. All combinations are generated (Cartesian product).
 *     Example: { Size: ['Small', 'Medium', 'Large'], Style: ['Primary', 'Ghost'] }
 *     produces 6 variants.
 *   - `baseProps`: Visual properties applied to every variant.
 *   - `page`: The PageNode to create components on (must be set as current page by caller).
 * @returns {Promise<{
 *   componentSet: ComponentSetNode,
 *   variants: ComponentNode[]
 * }>}
 */
async function createComponentWithVariants(config) {
  const { name, variantAxes, baseProps, page } = config

  // Ensure we are on the correct page
  await figma.setCurrentPageAsync(page)

  // Compute Cartesian product of variant axes
  const axisNames = Object.keys(variantAxes)
  const axisValues = axisNames.map((k) => variantAxes[k])
  const combinations = cartesianProduct(axisValues)

  // Build one component per combination
  const components = []
  for (const combo of combinations) {
    const comp = figma.createComponent()

    // Name: "Property=Value, Property=Value, ..."
    comp.name = axisNames.map((ax, i) => `${ax}=${combo[i]}`).join(', ')

    // Base geometry
    comp.resize(baseProps.width, baseProps.height)

    // Fills
    if (baseProps.fills !== undefined) {
      comp.fills = baseProps.fills
    } else {
      comp.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }]
    }

    // Corner radius
    if (baseProps.radius !== undefined) {
      comp.cornerRadius = baseProps.radius
    }

    // Auto-layout
    if (baseProps.layoutMode && baseProps.layoutMode !== 'NONE') {
      comp.layoutMode = baseProps.layoutMode
      comp.primaryAxisAlignItems = 'CENTER'
      comp.counterAxisAlignItems = 'CENTER'
      if (baseProps.itemSpacing !== undefined) {
        comp.itemSpacing = baseProps.itemSpacing
      }
    }

    // Padding
    if (baseProps.padding) {
      comp.paddingTop = baseProps.padding.top ?? 0
      comp.paddingBottom = baseProps.padding.bottom ?? 0
      comp.paddingLeft = baseProps.padding.left ?? 0
      comp.paddingRight = baseProps.padding.right ?? 0
    }

    page.appendChild(comp)
    components.push(comp)
  }

  // Combine into a component set
  const componentSet = figma.combineAsVariants(components, page)
  componentSet.name = name
  if (config.description) {
    componentSet.description = config.description
  }

  // Grid layout — variants stack at (0, 0) after combineAsVariants; reposition them.
  const GRID_GAP = 16
  const cols = Math.max(1, axisValues[axisValues.length - 1]?.length ?? 1)
  const variantWidth = baseProps.width
  const variantHeight = baseProps.height

  componentSet.children.forEach((variant, idx) => {
    const col = idx % cols
    const row = Math.floor(idx / cols)
    variant.x = col * (variantWidth + GRID_GAP)
    variant.y = row * (variantHeight + GRID_GAP)
  })

  // Resize component set to wrap its children with padding
  const totalCols = Math.min(cols, combinations.length)
  const totalRows = Math.ceil(combinations.length / cols)
  const PADDING = 40
  componentSet.resize(
    totalCols * variantWidth + (totalCols - 1) * GRID_GAP + PADDING * 2,
    totalRows * variantHeight + (totalRows - 1) * GRID_GAP + PADDING * 2,
  )

  // Position component set at a safe canvas location
  componentSet.x = 480
  componentSet.y = 80

  return { componentSet, variants: componentSet.children }
}

/**
 * Computes the Cartesian product of multiple arrays.
 * cartesianProduct([[A, B], [1, 2]]) → [[A,1], [A,2], [B,1], [B,2]]
 *
 * @param {Array<string[]>} arrays
 * @returns {string[][]}
 */
function cartesianProduct(arrays) {
  return arrays.reduce(
    (acc, curr) => acc.flatMap((combo) => curr.map((val) => [...combo, val])),
    [[]],
  )
}


figma.skipInvisibleInstanceChildren=false;
const page=await figma.getNodeByIdAsync("0:1");
const familyName="Benchmark/Patient search/run-183302";
if(page.children.some(n=>n.name===familyName))throw new Error("Run name already exists");
const x=Math.max(0,...page.children.map(n=>n.x+n.width))+200;
const assets=[{"index":0,"name":"Nav/Search","key":"99ad789a2c030b8a42c2ddb84b25d56e4610466e","type":"component_set","libraryKey":"lk-9fffe777331f943268265fbe94abe6c8170ab660ef7fc65e6562c2d62caadef19f1e5baf010fffd68d592b03c2cdd65e8334d2e7baa0845cc490b6b1c0b400ed"},{"index":0,"name":"Text field","key":"7c3c99bb9a9392d6571c0557b41d142b8987b566","type":"component_set","libraryKey":"lk-9fffe777331f943268265fbe94abe6c8170ab660ef7fc65e6562c2d62caadef19f1e5baf010fffd68d592b03c2cdd65e8334d2e7baa0845cc490b6b1c0b400ed"},{"index":0,"name":"List/Item","key":"1884b41be6b397af71aec82d10bea636e00e0789","type":"component_set","libraryKey":"lk-9fffe777331f943268265fbe94abe6c8170ab660ef7fc65e6562c2d62caadef19f1e5baf010fffd68d592b03c2cdd65e8334d2e7baa0845cc490b6b1c0b400ed"},{"index":0,"name":"Divider","key":"e1a369ce1b663c8e203a59c18f522108c62c8e6e","type":"component_set","libraryKey":"lk-9fffe777331f943268265fbe94abe6c8170ab660ef7fc65e6562c2d62caadef19f1e5baf010fffd68d592b03c2cdd65e8334d2e7baa0845cc490b6b1c0b400ed"},{"index":0,"name":"space/16","key":"6016592c19254dd61e9de9e006459546eaece0bb","type":"variable","libraryKey":"lk-9fffe777331f943268265fbe94abe6c8170ab660ef7fc65e6562c2d62caadef19f1e5baf010fffd68d592b03c2cdd65e8334d2e7baa0845cc490b6b1c0b400ed"},{"index":0,"name":"color/background/paper","key":"f1e85cc976b10ea275c03f5d7f21a0dc12cdfee0","type":"variable","libraryKey":"lk-9fffe777331f943268265fbe94abe6c8170ab660ef7fc65e6562c2d62caadef19f1e5baf010fffd68d592b03c2cdd65e8334d2e7baa0845cc490b6b1c0b400ed"},{"index":0,"name":"color/text/primary","key":"5c8867e0b6f174db9f69096580158df26e39baae","type":"variable","libraryKey":"lk-9fffe777331f943268265fbe94abe6c8170ab660ef7fc65e6562c2d62caadef19f1e5baf010fffd68d592b03c2cdd65e8334d2e7baa0845cc490b6b1c0b400ed"},{"index":0,"name":"color/text/secondary","key":"0d503f1eb6c6f3e923310b2ad6e621cc940b6543","type":"variable","libraryKey":"lk-9fffe777331f943268265fbe94abe6c8170ab660ef7fc65e6562c2d62caadef19f1e5baf010fffd68d592b03c2cdd65e8334d2e7baa0845cc490b6b1c0b400ed"},{"index":0,"name":"h4","key":"888b271ed38cdcfb86c35f9de8bff5ac9b81e8e3","type":"style","libraryKey":"lk-9fffe777331f943268265fbe94abe6c8170ab660ef7fc65e6562c2d62caadef19f1e5baf010fffd68d592b03c2cdd65e8334d2e7baa0845cc490b6b1c0b400ed"},{"index":0,"name":"body1","key":"c87aec6a94a2e25a8a25446f8d61716cb25abe73","type":"style","libraryKey":"lk-9fffe777331f943268265fbe94abe6c8170ab660ef7fc65e6562c2d62caadef19f1e5baf010fffd68d592b03c2cdd65e8334d2e7baa0845cc490b6b1c0b400ed"},{"index":0,"name":"body2","key":"cdb9fe68e6b5274b6e42be16d13bb3fb7834dccb","type":"style","libraryKey":"lk-9fffe777331f943268265fbe94abe6c8170ab660ef7fc65e6562c2d62caadef19f1e5baf010fffd68d592b03c2cdd65e8334d2e7baa0845cc490b6b1c0b400ed"}];
const [fieldSet,rowSet,dividerSet,space,paper,primary,secondary,h4,body1,body2]=await Promise.all([
...[1,2,3].map(i=>figma.importComponentSetByKeyAsync(assets[i].key)),
...[4,5,6,7].map(i=>figma.variables.importVariableByKeyAsync(assets[i].key)),
...[8,9,10].map(i=>figma.importStyleByKeyAsync(assets[i].key))]);
const fieldMaster=fieldSet.children.find(n=>n.name==="size=small, State=Default, Value=Filled, Fill=None");
const rowMaster=rowSet.children.find(n=>n.name==="Lines=Two, State=Default");
const dividerMaster=dividerSet.children.find(n=>n.name==="orientation=horizontal");
if(!fieldMaster||!rowMaster||!dividerMaster)throw new Error("Required master unavailable");
const fonts=[h4.fontName,body1.fontName,body2.fontName,...[fieldMaster,rowMaster,dividerMaster].flatMap(n=>n.findAllWithCriteria({types:["TEXT"]}).flatMap(t=>t.getStyledTextSegments(["fontName"]).map(s=>s.fontName)))];
await Promise.all([...new Map(fonts.map(f=>[JSON.stringify(f),f])).values()].map(f=>figma.loadFontAsync(f)));
function paint(v,node){const rgba=v.resolveForConsumer(node).value;return figma.variables.setBoundVariableForPaint({type:"SOLID",color:{r:rgba.r,g:rgba.g,b:rgba.b},opacity:rgba.a===undefined?1:rgba.a},"color",v);}
const {componentSet,variants}=await createComponentWithVariants({name:familyName,description:"Static patient-search visual states. Fictional patients. State is Figma-only; no search logic or prototype navigation.",variantAxes:{State:["Results","Empty"]},baseProps:{width:550,height:300,layoutMode:"VERTICAL",fills:[],padding:{top:16,bottom:16,left:16,right:16},itemSpacing:16},page});
const created=[componentSet.id,...variants.map(n=>n.id)];
const fields=[],rows=[],dividers=[],texts=[];
async function textNode(parent,copy,style,color){const t=figma.createText();await figma.loadFontAsync(t.fontName);await t.setTextStyleIdAsync(style.id);t.name=copy;t.textAutoResize="HEIGHT";t.resize(518,style.lineHeight.value);t.characters=copy;t.fills=[paint(color,t)];parent.appendChild(t);t.layoutSizingHorizontal="FILL";created.push(t.id);texts.push(t.id);return t;}
for(let i=0;i<variants.length;i++){
const p=variants[i];p.primaryAxisAlignItems="MIN";p.counterAxisAlignItems="MIN";p.clipsContent=false;p.fills=[paint(paper,p)];
for(const f of ["paddingTop","paddingRight","paddingBottom","paddingLeft","itemSpacing"])p.setBoundVariable(f,space);
p.layoutSizingHorizontal="FIXED";p.layoutSizingVertical="HUG";
await textNode(p,"Find a patient",h4,primary);
const field=fieldMaster.createInstance();p.appendChild(field);field.setProperties({"Label#123:0":"Search patients","Value text#123:11":i===0?"Morgan":"ZZZ","Show helper#123:33":false,"required#123:44":false,"select#123:55":false,"multiline#123:66":false});field.resize(518,field.height);field.layoutSizingHorizontal="FILL";created.push(field.id);fields.push(field.id);
if(i===0){
await textNode(p,"2 patients found",body2,secondary);
const list=figma.createAutoLayout("VERTICAL");list.name="Patient results";list.fills=[];list.itemSpacing=0;list.clipsContent=false;list.resize(518,100);p.appendChild(list);list.layoutSizingHorizontal="FILL";list.layoutSizingVertical="HUG";created.push(list.id);
for(let j=0;j<2;j++){if(j===1){const d=dividerMaster.createInstance();list.appendChild(d);d.resize(518,d.height);d.layoutSizingHorizontal="FILL";created.push(d.id);dividers.push(d.id);}
const row=rowMaster.createInstance();list.appendChild(row);row.setProperties({"Primary#174:0":j===0?"Morgan Lee":"Morgan Patel","Secondary#174:3":j===0?"Patient ID: 10482":"Patient ID: 10517","Show icon#174:9":false});row.resize(518,row.height);row.layoutSizingHorizontal="FILL";created.push(row.id);rows.push(row.id);}
}else{await textNode(p,"No patients found",body1,primary);await textNode(p,"Try a different name or patient ID.",body2,secondary);}
}
componentSet.x=x;componentSet.y=500;componentSet.fills=[];componentSet.clipsContent=false;
variants.forEach((n,i)=>{n.x=16+i*566;n.y=16;});
componentSet.resizeWithoutConstraints(1148,Math.max(...variants.map(n=>n.height))+32);
const section=figma.createSection();section.name="BENCHMARK · Slim builder · Patient search · 2026-10-31 · run-183302";section.x=x;section.y=0;
const review=figma.createAutoLayout("HORIZONTAL");review.name="Patient search review";review.fills=[];review.itemSpacing=16;review.counterAxisAlignItems="MIN";review.clipsContent=false;section.appendChild(review);review.x=16;review.y=16;
const instances=variants.map(n=>{const inst=n.createInstance();review.appendChild(inst);return inst;});
section.resizeWithoutConstraints(review.width+32,review.height+32);
created.push(section.id,review.id,...instances.map(n=>n.id));
return {createdNodeIds:created,sectionId:section.id,reviewId:review.id,familyId:componentSet.id,variantIds:variants.map(n=>n.id),instanceIds:instances.map(n=>n.id),fields,rows,dividers,texts,inspectionIds:[],bounds:instances.map(n=>({id:n.id,name:n.name,width:n.width,height:n.height})),tokens:{space:space.id,paper:paper.id,primary:primary.id,secondary:secondary.id},styles:{h4:h4.id,body1:body1.id,body2:body2.id}};

