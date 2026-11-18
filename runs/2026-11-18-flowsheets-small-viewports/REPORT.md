# Smaller No Editing viewports

Added [six viewport examples](https://www.figma.com/design/IgfgyXsw7FSxQQugnG5gtc/Flowsheets-27?node-id=2211-3164) in section06 on the existing No Editing page2074:8246. Table and compact-chart views at768,480 and390 px. Original frames preserved.

Reused source840/560 px tables, chart vectors, DS controls and local reusable DS-cell row compositions. Tables retain808/528 px readable content inside clipped horizontal-scroll viewports736/448/358 px. Visible-date counts describe fully visible columns; a hint explains scrolling. At480/390 px, chart trends stack below measure labels and latest values; legends wrap into two rows.768 px charts keep horizontal rows. This is an additive viewport study, not a new mobile component library.

Verification: all six actual widths and layouts inspected together; clipped Today axis labels corrected. Final narrow table inspected after fixing scroll-content dimensions.150/150 native Table/Cell instances resolve to the published DS set; all visible text Akkurat LL; no image-filled nodes. Native selector, close and segmented controls remain linked. Existing local-row limitation is unchanged. Horizontal scrolling is configured and bounds verified; no played-through prototype or responsive runtime claim. Other actions retain source behavior.

Evidence: build.js, refine.js, scroll-fix.js, verify.js, record.json, viewports.png and narrow-table.png. Not a benchmark: checkpoint timestamps and total duration were not captured. Pre-existing unpublished Problems work remains local.
