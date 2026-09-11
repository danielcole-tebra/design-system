# Flowsheets list appearance

Operator approved both recommendations with “go ahead with those recommendations”: align both dates under Updated and use the published filled selector with Flowsheets floating label above Mental Health. Earlier build quote remains item-specific.

518px content width, paper surface, auto-layout. Header uses the existing small40px Autocomplete/Field, large42px contained primary Create New Flowsheet button with end PlusOutlined; 16px gap and vertical padding. Field remains transparent over paper. No shared control overrides or invented variants.

Column heading uses color/core/light and four live Table/Cell head/none instances (Akkurat LL Bold14/20), 8px vertical padding. Column widths80/136/110/192 correspond to measure x0, latest x80, updated x216, actions x326. Actions label right aligned. Basic spacer moves before Updated in its existing master. Existing live rows retain all GAP labels, substitute icons and First Aid/Neuron example paints. Table heading height36 follows code typography20+16 padding rather than source34.

Footer action is a separate518px component with right-aligned medium38px Add to Note button. It is not added to the shared sheet shell. Source36 becomes library38 per code. No graphs, questionnaires, new severity logic, hidden source states or full-sheet composition.

Source: source.json BODY939:9233, SUBHEADER939:9234, footer action939:9383. Code inspected: ButtonOverrides.ts, AutocompleteOverrides.tsx, TextFieldOverrides.tsx, TableOverrides.ts under packages/design-system; Table head uses core.light and h5. Fresh mapped components: fresh-library.json, table-cell.json. All solid paints bound; spacing8/16 bound. New helper backdrops paper or transparent.

Each Header, List body and Footer action gets dedicated frozen2x source, live rebuild and Change log comparison. Inspect each live render plus affected Basic row regression. Preserve shared comparison/shell definitions and geometry.
