# Problems DS translation

[Review in SDE Rebuild](https://www.figma.com/design/fdCQVFdvOByaOYIJYag0d6/SDE-REbuild?node-id=1829-2321).

Translated both designs on Problems into native editable layers and linked Design System Rebuild controls. New sheets: Problems `1829:2321`, Problem Details `1829:2590`. Originals `1824:238628` and `1824:238770` remain at y950. Local body and row compositions remain at y1900 for reuse; library masters unchanged.

Uses the existing SDE Sidesheet shell `6:65` with Body content swap, DS Buttons, Icon buttons, Chips, Form control label/Checkbox, Dividers and Text fields. Bound DS styles/variables govern text and local composition. No Code Connect component mappings were found in the accessible project folders.

Both sheets are550 ×718 to fit native controls. List has158 descendants and70 instances; editor195 descendants and50 instances, including hidden shell content. Neither contains image-filled nodes. Both final screenshots were visually inspected; all visible text is Akkurat LL and content fits542px available body space (list496, editor444).

The raw audit reports false because the close-button child slot is named Icon/CloseOutlined rather than the master's generic Icon. The independent follow-up confirms its exact published swap key. The remaining12 control comparisons and all12 measured assertions pass. This is an expected supported icon swap, not a style or token deviation.

Date inputs compose native fields with adjacent DS calendar buttons; Text field does not expose an end-adornment slot. Native multiline demo rows were overridden with blank text, and local row containers were unclipped to let floating labels render. The editor header was refreshed after a stale text-layout render. No library control structure or styling was changed.

Source content is retained, including the sample code differences between list and editor. These are visual mocks; no prototype interactions were added. Ready for review.

Evidence: record.json, build.js, fix.js, audit.js, source-list.png, source-details.png, problems-list.png, problem-details.png. Not a benchmark; checkpoint times were not captured.

