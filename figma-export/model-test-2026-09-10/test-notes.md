# Model Test — Family History Condition Row Addition

**Date:** 2026-09-10  
**Target Figma File:** `fdCQVFdvOByaOYIJYag0d6`  
**Test Section:** `642:7556` ("MODEL TEST — not for production")  
**Test Node:** `642:7557` ("Family history edit form — MODEL TEST")  

## Verifications
1. **Conditions Sequence:** Diabetes, Hypertension, and Asthma appear in that exact order, each appearing once.
2. **Remove Controls:** Each condition row has its consistent red remove icon button (`Remove asthma`, `Reaction asthma`).
3. **Comments Placement:** The Comments multiline field sits directly below Asthma with no overlap or clipping, and the form height expanded from 468px to 524px naturally via auto-layout.
4. **Production Preservation:** 
   - Original form component `636:3` remains unchanged (height 468px, 7 children).
   - Production comparison `638:13053` remains untouched.
