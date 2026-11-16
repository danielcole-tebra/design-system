# Problems typing shortcuts · DS screen study

[Review the new page](https://www.figma.com/design/ViAWRVVtgkCXzItk0sQ5P0/SDE-Alpha-Prototypes?node-id=1396-6798)

Created **Study · Problems typing shortcuts** in Alpha Prototypes, page `1396:6797`. Six editable desktop screens: discover `/problems`, select an active problem, keyboard-select Add all, insert a repeated problem chip, insert all active problems, and no active problems.

Reused the existing Maya encounter composition. New local SCAFFOLDING menu compositions use linked Design System Rebuild Menu/Item instances (Default, Focus visible, Disabled), library entity chips, bound tokens and published Elevation / 8. Original pages and library definitions were preserved. Local menu masters remain below the review board.

Verified **9/9** DS control comparisons and **25/25** measured assertions. Final overview and native-resolution picker screenshot were inspected. New note/menu typography is Akkurat LL. No image fills occur inside the screen board.

The inherited navigation search placeholder has an Inter override in the source composition. It is recorded and retained; no shared-library typography was changed. Screens show intended keyboard behavior and caret locations, but do not implement text entry or a keyboard-driven prototype. Empty state is a scenario fixture using the same shell.

Recovery: first attempt exceeded the tool return limit and rolled back; confirmed no new page before retry. Corrected gallery sizing, adopted DS elevation, and rendered explicit carets. The first audit counted nested chip icons as additional chips; the corrected audit counts known chip roots and passes.

Evidence: [record.json](record.json), [overview.png](overview.png), [active-problems.png](active-problems.png), [build.js](build.js), [refine.js](refine.js), [verify.js](verify.js).

Not a benchmark; elapsed-time checkpoints were not captured.

