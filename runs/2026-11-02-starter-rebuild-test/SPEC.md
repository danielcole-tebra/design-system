# Contact-details image rebuild test

Requested by Daniel on 2026-11-02: use the supplied onboarding image to test conversion to the design system.

Destination: dZqYSxEj3scbmRP4IqJGLh (new Tebra Design file). Source library: YX2n4YLrEpBXNbcc73T6dw. Starter: assets/onboarding/contact-details-starter.png. Library source remains unchanged.

Acceptance: preserve the original image in a separate reference area; produce editable Empty and Filled compositions using published library controls, with instances at 640 and 400 px card widths. Filled: Alex Morgan, alex.morgan@example.com, (202) 555-0148, Email, checked reminders. Empty: cleared fields/unselected contact/unchecked reminders. Preserve title, description, labels, Cancel and Save changes. Omit outside-card practice label from outputs. Show screenshots and verified what-changed checklist.

Sections: header (h2/body1), name row, email/phone/contact fields, checkbox label, footer actions. Library Card lacks a content-swap property for arbitrary form content, so a local reusable form composition will use library controls and foundations. No published internals modified. This is a composition, not a new published library component. Name row wraps when narrowed; target widths are specified by the exercise.

Cancel: discard edits; Save changes: save contact details. Both are static representations; no persistence, validation logic or played prototype is requested. Default/resting state only. Cancel uses visually outlined contained/primary; Save uses filled contained/secondary to preserve contrasting action emphasis in the design-system palette. Paper-backed fields follow the edit-form composition as a derivative; 16 inset/gap, 8 related gap, library radius and elevation.

Verification must include actual properties/imports/fonts, nested controls, tokens/styles, effective visible content, target widths, clipping, screenshot inspection and preservation of original bytes. Browser/client clipboard onboarding is not simulated by an MCP build; retain that as an untested pilot step. Stop for Daniel's read after this build batch.
