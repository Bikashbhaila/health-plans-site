import type { ColDef } from "ag-grid-community";
import type { HealthPlan } from "../util/types.ts";

export const healthPlanColumnDefs: ColDef<HealthPlan>[] = [
    { field: 'name', flex: 1, minWidth: 160 },
    { field: 'provider', flex: 1,  minWidth: 160 },
    { field: 'monthlyPremium', headerName: 'Monthly ($)', sortable: true, width: 140, minWidth: 120 },
    { field: 'deductible', headerName: 'Deductible ($)', width: 150, minWidth: 130 },
    { field: 'description', flex: 2, minWidth: 240 }
];
