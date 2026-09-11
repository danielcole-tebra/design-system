const {finalizeRecord}=require('./scripts/schema/lib');
console.log(finalizeRecord('npveRebuild_patientSummaryBody_2026-09-10',r=>({...r,_status:'DONE — three full Patient Summary sheets verified; family build complete'})));
