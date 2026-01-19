import {useCallback, useEffect, useRef, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {
    Alert,
    Box,
    Button,
    Container,
    FormControlLabel,
    Paper,
    Switch,
    TextField,
    Typography
} from "@mui/material";

import type {HealthPlan} from "../util/types.ts";
import {fetchHealthPlans} from "../services/healthPlanServices.ts";
import {healthPlanColumnDefs} from "../helpers/healthPlanColumns.ts";
import {MAX_COMPARE} from "../util/constants.ts";
import {saveCompare} from "../helpers/compareStorage.ts";
import ComparisonTray from "../components/ComparisonTray.tsx";
import SnackBarWrapper from "../components/SnackBar.tsx";

import '../styles/browsePage.css';
import ClearSearch from "../components/ClearSearch.tsx";

export default function BrowsePage() {
    const [healthPlans, setHealthPlans] = useState<HealthPlan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedPlans, setSelectedPlans] = useState<HealthPlan[]>([]);
    const [limitOpen, setLimitOpen] = useState(false);

    const [search, setSearch] = useState('');
    const [sortByPremium, setSortByPremium] = useState(false);
    const [viewStats, setViewStats] = useState({count: 0, avg: 0})

    const gridRef = useRef<AgGridReact<HealthPlan>>(null);

    const loadHealthPlans = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await fetchHealthPlans();
            setHealthPlans(data);
        } catch (e: any) {
            setError(e?.message || 'Failed to load health plans')
        } finally {
            setLoading(false);
        }
    }, []);

    // update stats (count and average) as plans get filtered
    const updateStats = useCallback(() => {
        const gridApi = gridRef.current?.api;

        if (!gridApi) return;

        let total = 0;
        let count = 0;

        gridApi.forEachNodeAfterFilterAndSort((node) => {
            if (!node.data) return;

            total += node.data.monthlyPremium;
            count += 1;
        });

        setViewStats({count, avg: count ? Math.round(total / count) : 0})
    }, []);

    // handle plan selection
    const onSelectionChanged = useCallback(() => {
        const gridApi = gridRef.current?.api;

        if (!gridApi) return;

        const selected = gridApi.getSelectedRows() as HealthPlan[];

        if (selected.length <= MAX_COMPARE) {
            setSelectedPlans(selected);
            saveCompare(selected);
            return;
        }

        // deselect the newly selected plan after threshold limit of 3 reached
        const lastSelected = selected[selected.length - 1];
        gridApi.forEachNode((node) => {
            if (node.data && (node.data as HealthPlan).id === lastSelected.id) {
                node.setSelected(false)
            }
        });

        setLimitOpen(true);

        const finalSelected = gridApi.getSelectedRows() as HealthPlan[];
        setSelectedPlans(finalSelected)
        saveCompare(finalSelected);
    }, []);

    useEffect(() => {
        void loadHealthPlans();
    }, [loadHealthPlans]);

    useEffect(() => {
        updateStats();
    }, [search, updateStats]);

    // apply sort by monthly premium
    useEffect(() => {
        const gridApi = gridRef.current?.api
        if (!gridApi) return;

        gridApi.applyColumnState({
            state: [{colId: 'monthlyPremium', sort: sortByPremium ? 'asc' : null}],
            defaultState: {sort: null}
        })

        updateStats();
    }, [sortByPremium, updateStats]);

    const clearCompare = useCallback(() => {
        setSelectedPlans([]);
        saveCompare([]);
        gridRef.current?.api.deselectAll();
    }, []);

    if (loading) {
        return (
            <Container maxWidth='lg' sx={{py: 3}}>
                <Typography variant='h5'>TRASE Health Plans</Typography>
                <Typography sx={{mt: 2}}>Loading...</Typography>
            </Container>
        );
    }

    // unhappy path with the option for the user to retry with button click
    if (error) {
        return (
            <Container maxWidth='lg' sx={{py: 3}}>
                <Typography variant='h5'>Health Plans</Typography>

                <Alert severity='error' sx={{mt: 2}}>{error}</Alert>

                <Box sx={{mt: 2}}>
                    <Button className='trase-button' variant='contained' onClick={loadHealthPlans}>Retry</Button>
                </Box>
            </Container>
        );
    }

    return (
        <div className="trase-page">
            <div className="trase-stage">
                <Typography className='trase-title' variant='h5'>TRASE Health Plans</Typography>

                <div className="trase-divider"/>

                {/* Controls */}
                <div className='trase-controls'>
                    <div className='trase-controls-row'>
                        <TextField
                            className='trase-input'
                            label='Search Plans'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            size='small'
                        />
                        <ClearSearch
                            visible={search.length > 0}
                            onClear={() => setSearch("")}
                        />
                        <FormControlLabel
                            label='Sort by monthly premium'
                            className='trase-label'
                            control={
                                <Switch
                                    checked={sortByPremium}
                                    onChange={(e) => setSortByPremium(e.target.checked)}
                                />
                            }
                        />
                    </div>
                </div>

                {/* Comparison-Tray */}
                <ComparisonTray selectedCount={selectedPlans.length} onClear={clearCompare}/>

                <Paper className='trase-panel' sx={{mt: 2, p: 0}}>
                    {/* AG-grid */}
                    <div className='ag-theme-alpine trase-grid'>
                        <AgGridReact
                            ref={gridRef}
                            rowData={healthPlans}
                            columnDefs={healthPlanColumnDefs}
                            rowSelection={{mode: "multiRow", checkboxes: true, enableClickSelection: false}}
                            onSelectionChanged={onSelectionChanged}
                            quickFilterText={search}
                            onGridReady={updateStats}
                            onFilterChanged={updateStats}
                            onSortChanged={updateStats}
                        />
                    </div>

                    {/* Footer with total plan count and avg premium */}
                    <div className="trase-footer">
                        <span className="trase-footer-text">
                            Showing {viewStats.count} plans · Average premium: ${viewStats.avg}
                        </span>
                    </div>
                </Paper>

                {/* To alert user if more than 3 plans selected for compare */}
                <SnackBarWrapper open={limitOpen} onClose={() => setLimitOpen(false)}/>
            </ div>
        </ div>
    );
}
