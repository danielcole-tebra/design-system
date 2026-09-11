const {finalizeRecord}=require('./scripts/schema/lib');
console.log(finalizeRecord('workflow_creditResetObservation_2026-09-10',r=>({...r,_status:'DONE — 143-credit reading recorded; suspected reset prevents cost comparison',verification:'Operator quote preserved; delta null; previous records and token observations unchanged; repository-only supplement.'})));
