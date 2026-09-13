const fs = require('fs');
const P = './design-system-schema.json';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));

s.quietPatientChipsWithoutFill2026_09_01 = {
  _status: 'BUILT. Additive only — nothing deleted, State 1 and State 2 untouched and verified.',
  _file: 'Proposals file zKT34LQogNjz3Z07fY4VQB, page "Patient chart v2 — ledger in the shell".',
  frame: '220:980 "State 3 — quiet patient, chips without fill", 1440x1157 at (3960, 0). Frame label 220:1107 at (3960, -146).',
  builtFrom: 'A clone of State 1 168:249. Global nav, standing record links, four-column ledger structure, Card component, info icon and thumbs treatment all carried over unchanged.',

  nameCollisionForDecision: {
    _status: 'FOR DECISION — flagged, not resolved.',
    problem: 'The page now holds TWO frames whose names begin "State 3": 205:773 "State 3 — insight card, reasoning tooltip open" and the new 220:980 "State 3 — quiet patient, chips without fill".',
    whyNotResolved: 'The instruction named the new frame explicitly, and renaming the older one was not asked for. Additive discipline says flag rather than touch.',
    recommendation: 'The older frame is a tooltip reference, not a chart state. Renaming it to something like "Reference — reasoning tooltip open" would free the State N sequence for actual chart states. One rename, no other consequence.'
  },

  change1_chipsLoseFill: {
    done: 'All 15 chips in the new ledger set to variant=outlined, color=default. Verified: every one returns NO FILL, stroke #D6D6D6. That includes the four hidden tombstone rows, so unhiding one cannot reintroduce fill.',
    whyGreyOutlined: 'As instructed and as already recorded in the reader\'s notes DEFECT panel: ChipOverrides colorSuccess, colorInfo and colorError each set a backgroundColor, and theme styleOverrides are appended after MUI base rules, so they beat variant=outlined. default/outlined is the only combination that actually renders transparent.',
    thePremiseMeasured: {
      finding: 'The redundancy claim holds, and the direction is worth stating precisely.',
      numbers: 'State 1 has 15 chips, of which 5 are filled (#FCDE73 warning) and 10 outlined. It has 7 rows carrying an Action.',
      relationship: 'Fill implies action — all 5 filled chips sit on rows with an Action entry. Action does not imply fill — 2 action rows (both Note / Open) carry outlined chips. So fill was a strict subset of actionability and told a scanner nothing the Action column had not already said. Removing it removes a duplicate signal, not a unique one.'
    },
    whatWasLost: {
      actionability: 'Nothing. The Action column carries it alone and reads clearly — teal labels against an otherwise empty column, on 5 of 11 rows.',
      eventType: 'Type is now a label you read rather than a colour you spot. On this scenario that costs little, because the ledger is 11 rows and the What happened column already names the event in its first two words ("Records received", "Patient message", "Lipid panel"). On a 40-row ledger the cost would be real and this frame does not test it.',
      theHonestFinding: 'It does read flat, and the flatness raises a question the brief did not ask. With no fill and no colour, eleven identical grey pills encode nothing — the pill is furniture around a word. If Type is only ever a quiet label, plain text in the Type column would say the same thing with less chrome and would stop the column competing with the Action column for attention. Reported, not corrected, as instructed.'
    }
  },

  change2_elapsedDivider: {
    built: '220:1098, renamed "Elapsed-since-last-visit band — drawn". 72px tall (rows are 52px), fill background.default #E8E5DF bound, one string at 16px Akkurat LL Bold where rows are 14px Regular.',
    text: '"Since the last visit on 21 Jul 2026 — 4 events" — the proposed wording, built verbatim as instructed.',
    weightMechanism: 'Three signals separate it from a row without inventing chrome: it is 20px taller than any row, it is the only beige surface inside a white table so the page canvas reads as interrupting the table, and its type is one step up in both size and weight. No rules, no borders, no card.',
    dividerScopeDecision: {
      chosen: 'ONLY the most recent visit gets a divider. The 09 Jan 2026 and 22 Sep 2025 visits render as ordinary Note rows.',
      why: 'Three reasons. First, the chart is answering one question — when did I last see this patient and what has happened since — and one question takes one answer; three bands in an eleven-row ledger is a band every three rows, which turns the device back into the row separator it is trying to stop being. Second, the elapsed statement is only true of the most recent visit; "since the visit on 09 Jan 2026 — 7 events" is a different and less useful claim, and two such counts in one column compete. Third, chunking the whole ledger by visit is a different information architecture, not a divider treatment, and it is not what was asked for.'
    },
    betterConstructionNoted: {
      _status: 'NOTED, NOT SUBSTITUTED, as instructed.',
      observation: 'The proposed wording states a date and a volume but not an elapsed duration. "Since the last visit on 21 Jul 2026" makes the reader compute six weeks from the date. The brief asked the band to "state elapsed time and volume", and as written it states a date and volume.',
      alternative: 'Putting the duration first delivers the elapsed part directly and keeps the date available: "6 weeks since the last visit — 21 Jul 2026 · 4 events". It also front-loads the number that changes, which is the one worth scanning for.',
      secondOrderNote: 'Reading top-down the reader meets the four events before the band that labels them. The band both closes the group above and introduces the visit below, which is coherent, but a duration-first phrasing would survive that order better because the duration reads as a heading rather than as a caption for what came before.'
    }
  },

  change3_scenario: {
    patient: 'Ruth Delgado, she/her, Female, 14 Feb 1968 (58 y/o), MRN 02141968-04. Balance $0.00. Allergy line reduced to "Moderate: penicillin", View all (2).',
    ledger: '11 rows spanning 22 Sep 2025 to 12 Aug 2026 — just under twelve months, with visible gaps (Sep to Nov, Feb to May).',
    visits: 'Three: annual physical 21 Jul 2026, sick visit for viral URI 09 Jan 2026, office visit for right knee pain 22 Sep 2025.',
    actionsUsed: 'Only evidenced labels, verbatim: Open x3 and Merge To Chart x2. Six of eleven rows carry no action at all.',
    placeholdersNotUsed: 'Review, Accept and Release do not appear. No row was manufactured to use them, as instructed.',
    evidencedLabelsNotUsed: 'Reply, Collect Payment and View are also absent — nothing in this scenario legitimately calls for them.',
    dateFormatChange: {
      what: 'The When column moved from "29 Aug  4:12 PM" to "12 Aug 2026" — year gained, time dropped.',
      why: 'A year of history needs the year or September 2025 and September 2026 are indistinguishable. The 160px column with 16px padding leaves 128px, which will not hold date, year and time at 14px. Time of day earns its place on a patient with four events in one afternoon; it earns nothing on a patient with eleven events in a year.',
      status: 'Scenario-driven, reported rather than assumed. Reverting to include time would need a wider When column.'
    }
  },

  change4_insightsAsObligations: {
    cards: [
      '220:996 — "Colorectal screening not on file at 58"',
      '220:997 — "Knee pain from September was never followed up"',
      '220:998 — "Atorvastatin not refilled since February"'
    ],
    grounding: 'Each rests on ledger rows or on an absence visible in the ledger. The knee card names the 22 Sep 2025 row and the absence of anything after it. The atorvastatin card names the 18 Feb 2026 refill, its stated 90-day supply, and the contrast with the 06 May lisinopril refill. The screening card names the 21 Jul physical and the absence of any colonoscopy or referral in twelve months.',
    theFailureModeWasPredictedAndItHappened: {
      _status: 'CONFIRMED ON THE CANVAS. Reported, not fixed, as instructed.',
      finding: 'Yes — the band reads heavier here than the same three cards read on the busy patient.',
      mechanism: 'Two things changed at once. On State 1 the cards competed with a dense ledger of yellow chips and seven teal actions, so they were one voice among several. Here the ledger is deliberately quiet — grey chips, five actions, six empty action cells — so the three cards are the busiest thing on the screen and hold the top third of the page uncontested. A chart whose whole message is "nothing is wrong" opens with three statements of things not done.',
      secondMechanism: 'Equal weight flattens unequal things. A colorectal screening overdue at 58 and an atorvastatin refill the patient may have stopped on purpose are rendered identically. On the busy patient the cards were all genuinely urgent, so uniform weight cost nothing; on this patient it manufactures urgency for at least one of the three.',
      whatThisArguesFor: 'Not a fix in this frame. It argues that the insight band needs either a density rule tied to how much is actually outstanding, or a weight axis on the card so a routine obligation can render lighter than a clinical one. Both are decisions, not corrections.'
    }
  },

  incidentalFindings: {
    collectPaymentAtZeroBalance: 'The action row still offers "Collect Payment" while the header reads Balance $0.00. The label was left verbatim because it is one of the five evidenced labels and the action row was out of scope, but on a patient with nothing owed the control is offering an action with no object. Screen logic, not a component defect. FOR DECISION.',
    allergyIconIsTheLoudestThingOnScreen: 'The red AttentionFilled glyph on "Moderate: penicillin" is the highest-contrast element on a screen whose entire point is that nothing is wrong. An allergy banner is a standing safety fact and should persist, so this is probably correct — but it is worth knowing that severity chrome does not scale down with severity, and on a quiet patient it dominates.',
    frameHeight: 'The new frame settled at 1157 tall against 1357 for States 1 and 2, because the page content hugs and this ledger is five rows shorter. Left as is — a quiet chart being shorter is honest, and nothing was padded to match.'
  },

  gapMarkerAdded: {
    where: 'Reader\'s notes 168:685, appended as panel 225:1224 — in the annotation column, not inside the frame, per instruction.',
    label: 'GAP — no component expresses a structural break inside a table.',
    content: 'Example first (the real band cloned and shrunk to 460px), then the marker header, then the difference statement — the order the convention requires so marked and unmarked examples share a baseline.',
    reasoning: 'Table/Row is a fixed 52px and takes cells rather than a statement; Divider is a 1px rule holding no content; Alert is a banner carrying a severity the band does not have. Giving the band the weight it needs makes the missing component more visible, not less.',
    tombstoneInside: 'The cloned panel\'s original example was hidden and renamed rather than deleted.'
  },

  verification: {
    chipFill: 'PASS. All 15 chips in the new ledger return NO FILL with variant=outlined, color=default. Checked programmatically on absolute fill arrays, including hidden rows.',
    state1Unchanged: 'PASS. 1440x1357 at (0,0), 15 chips of which 5 still filled #FCDE73, 121 instances, 0 missing main components, patient still Dana Whitfield.',
    state2Unchanged: 'PASS. 1440x1357 at (1520,0), same chip and instance counts, patient still Dana Whitfield.',
    newFrameIntegrity: 'PASS. 121 instances, 0 missing main components, 119 remote. The 2 local are Patient header and Patient action row, which are proposal-local components on other pages of this file. No instance was detached.',
    overlaps: 'PASS. Pairwise absoluteBoundingBox intersection across all 13 top-level nodes returns zero overlapping pairs, after the reader\'s notes frame grew from 6632 to 6924.',
    iconAlignment: 'PASS. All three info icons still share a centre line with their thumbs, carried over from the clone.',
    componentLimitsRespected: 'No instance detached. Row height stayed 52px on every row. One text property per cell respected — the drawn type and action cells were reused as-is. The divider remains a drawn frame because no component can express it, and that is now marked.',
    deletions: 'NONE. Four unused ledger rows and one cloned example were set visible=false and renamed TOMBSTONE for manual clearing.'
  },

  publishStep: 'None. Nothing in the library was touched.'
};

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('written. top-level keys:', Object.keys(s).length);
