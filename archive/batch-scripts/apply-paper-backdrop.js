const fs = require('fs');
const P = './design-system-schema.json';
const s = JSON.parse(fs.readFileSync(P, 'utf8'));

// --- mark the prior open decision superseded (additive: original text retained) ---
const prior = s.beigeSurfaceInvestigation2026_08_31.unboundLiteralsBound2026_08_31;
prior.backdropConventionStillOpen =
  'SUPERSEDED 2026-09-01 by compositionBackdropConvention2026_09_01 — settled on background.paper. '
  + 'Was: "' + prior.backdropConventionStillOpen + '"';

const inc = s.beigeSurfaceInvestigation2026_08_31.inconsistencyFoundInsideFigma;
inc.compositionFrameFills =
  'SUPERSEDED 2026-09-01 — the tally was wrong and is corrected in '
  + 'compositionBackdropConvention2026_09_01.correctionsToThePriorRecord. '
  + 'Was: "' + inc.compositionFrameFills + '"';

s.compositionBackdropConvention2026_09_01 = {
  _status: 'DONE. Backdrop only — no colour token, geometry, component or layout change. Nothing published.',
  decision: 'Every composition frame on the Compositions page sits on color/background/paper (#FFFFFF, VariableID:74:39). Beige is not used as a composition backdrop. Settled by Daniel 2026-09-01.',
  rationale: 'Daniel: the beige backdrop reads as a colour he has never seen in the product. It was accepted that beige IS the genuine product body canvas (established in beigeSurfaceInvestigation2026_08_31 and NOT revisited — the token is untouched), but that a reference frame should not foreground a colour the reader never consciously registers. The library token and the composition backdrop are separate decisions and were decided separately.',
  scopeExplicitlyNotChanged: {
    token: 'background.default #E8E5DF is untouched. paletteValues.ts:70 stands. No product or theme change.',
    navComponents: 'The Nav component family in section 280:108 was not touched — those are COMPONENT/COMPONENT_SET nodes with intentional teal fills, and their placement is a separate open issue (navComponentsOnCompositionsPage).',
    avatarLetter: 'Two Avatar fallback Letter TEXT nodes remain bound to background.default. Correct — MUI Avatar uses background.default as a FOREGROUND against grey[400]. Not a backdrop.'
  },
  correctionsToThePriorRecord: {
    _why: 'Both corrections came from a live scan, which is authoritative over the written tally per auditsRetired2026_08_31.',
    sectionsAreWhiteNotCanvas: 'The prior record stated that NO-FILL composition frames "sit on the #F5F5F5 page canvas". False. All 7 SECTION nodes on the Compositions page are filled #FFFFFF (unbound literals). A no-fill frame therefore already rendered on white. Five frames were in that state before this change, so for those five nothing moved visually — the change only made the white explicit and bound.',
    tallyWasWrong: 'Prior record said 15 frames = 9 beige / 2 grey300 / 4 no-fill. Live scan found 15 frames = 8 beige / 2 grey300 / 5 no-fill. The missed no-fill frame is 563:3 Data grid toolbar in the "Not built / deferred" section.',
    sectionFillsStillUnbound: 'The 7 SECTION fills are #FFFFFF UNBOUND literals. Not changed here — out of scope — but they are now the only unbound white surfaces on the page and are a candidate for the same binding. FOR DECISION.'
  },
  framesChanged: {
    count: 15,
    method: 'fills array cloned (read-only), figma.variables.setBoundVariableForPaint applied to paint 0, returned paint captured and the array reassigned. Frames with no fill received a white SOLID paint which was then bound. Applied in two batches of 8 and 7.',
    fromBeige_8: [
      '371:780 Autocomplete open state',
      '154:11 Select + Menu',
      '193:14 Table assembly (SUPERSEDED frame)',
      '372:2232 Assembled pagination',
      '822:1649 Alert with actions',
      '373:833 Card header band',
      '187:47 Dialog assembly',
      '281:731 Primary nav with open submenu'
    ],
    fromGrey300_2: ['161:110 Button group segment row', '177:6 Stacked adjacency'],
    fromNoFill_5: [
      '536:3 Selection / bulk action bar',
      '317:60 Chip — common configurations',
      '446:3 Table assembly',
      '498:2 Drawer panel',
      '563:3 Data grid toolbar — HAND-DRAWN, NOT BUILT'
    ],
    supersededAndDeferredIncluded: 'Both 193:14 (superseded) and 563:3 (not built) were included so the page carries ONE convention with no exceptions to explain. Neither is published.'
  },
  verification: {
    geometryUnchanged: 'x, y, width and height captured before and after on all 15 frames — byte-identical on every one.',
    pageLayoutIntact: 'All 7 section x/y positions re-read after the change and matched against their pre-change values. All 7 match. The hand-laid-out horizontal layout is preserved; nothing was repositioned or re-flowed.',
    bindingConfirmed: 'All 15 frames re-read: paint 0 is SOLID with boundVariables.color.id === VariableID:74:39.',
    beigeSweep: 'Whole-page walk at every depth returns 3 remaining #E8E5DF fills: two Avatar Letter TEXT nodes (correct, see scopeExplicitlyNotChanged) and one frame, 565:32 — see remainingBeigeFrame.',
    screenshots: 'Four rendered and inspected: 193:14, 373:833, and the Anatomy rows of 187:47 and 822:1649.'
  },
  whatSurvivedAndWhatDidNot: {
    _method: 'Before applying, every white non-text surface over 6000px was checked for a shadow or stroke and for the colour of the first filled ancestor. Only surfaces whose ancestor was beige or grey300 could be affected — anything already on a white ancestor was white-on-white before this change and is unchanged by it.',
    survived: {
      tables: '193:14 and 446:3 table rows hold their shape on white — rows alternate with a striped fill and the head band is core.light, so the table reads as a table without needing the frame behind it. Screenshot confirmed.',
      cards: '373:833 Card header band cards carry drop shadows and keep their edges. Screenshot confirmed.',
      dialogScrim: '187:47 Dialog assembly survives by accident: its Stage lost its edge, but the scrim is a dark translucent layer that supplies its own contrast, and the dialog card has a shadow. The stage region still reads.',
      alertItself: '822:1649 the Alert component itself reads — it is a white card with a coloured border per AlertOverrides, so the border carries it.'
    },
    lost: {
      _count: 1,
      alertStage: '822:1649 "Stage — page content" (823:1653, 800x422). A white frame with no shadow and no stroke that was sitting on beige and is now on white. Its edge is gone. This matters more than a cosmetic loss: the frame carries a caption reading "Page surface — the alert renders inline in page flow. Nothing dims or covers the page, because Alert has no scrim and no modal layer." That sentence points at a page surface the frame can no longer show. The anatomy asserts something it no longer demonstrates.',
      dialogStagePartial: '187:47 "Stage — app content behind the scrim" (787:1455, 800x420) lost its edge too, but is rescued by the scrim sitting on it. Lower priority than the Alert stage, and the same fix applies.'
    },
    recommendedFix: {
      proposal: 'Set the two Stage frames to background.default #E8E5DF.',
      whyThisIsNotAReversal: 'A Stage is not a backdrop. It is a depiction of the product page canvas, and the product page canvas genuinely IS #E8E5DF — that is exactly what beigeSurfaceInvestigation2026_08_31 established from source. Making the Stage beige is the semantically correct fill, and it restores the contrast the anatomy needs. The composition frame stays white; the thing inside it that represents a page is beige because a page is beige.',
      alternative: 'A 1px divider stroke on each Stage. Keeps beige off the page entirely, at the cost of depicting the page surface with a colour it does not have.',
      status: 'FOR DECISION — not applied.'
    }
  },
  remainingBeigeFrame: {
    node: '565:32 "2 Grid against table example", 1672x376, bound to VariableID:74:40',
    where: 'Not built / deferred > 563:3 Data grid toolbar (HAND-DRAWN, NOT BUILT) > 565:31 "2 Grid against table" > 565:32',
    why_not_changed: 'It is a nested example stage inside a frame explicitly marked NOT BUILT, not a composition frame backdrop, so it falls outside the decision as scoped. Left deliberately and flagged rather than swept up.',
    status: 'FOR DECISION — one node, trivially flipped if the convention should reach nested example stages too.'
  },
  publishStep: 'None required. No published component was affected — all 15 are unpublished reference frames per libraryRestructure2026_08_26c.settledDecisionsApplied.compositionsAreReferenceFrames.'
};

fs.writeFileSync(P, JSON.stringify(s, null, 1));
console.log('written. top-level keys:', Object.keys(s).length);
