import {useMemo} from "react";
import {useNavigate} from "react-router-dom";

import '../styles/browsePage.css';
import {loadCompare} from "../helpers/compareStorage.ts";
import {Typography} from "@mui/material";

export default function ComparePage() {
    const navigate = useNavigate();

    const plans = useMemo(() => loadCompare(), []);

    return (
        <div className="trase-page">
            <div className="trase-stage">
                <div className="compare-top">
                    <Typography className='trase-title' variant='h5'>TRASE Compare Plans</Typography>
                    <button
                        className="trase-button compare-tray-btn"
                        data-cy= "back-button"
                        onClick={() => navigate("/")}
                    >
                        Back
                    </button>
                </div>

                <div className="trase-divider"/>

                {plans.length === 0 ? (
                    <p className="compare-empty">No plans selected. Go back and pick up to 3 plans.</p>
                ) : (
                    <div className="compare-table">
                        <div className="compare-row compare-head">
                            <div className="compare-cell compare-label-cell"></div>
                            {plans.map((p) => (
                                <div key={p.id} className="compare-cell compare-plan-head">
                                    <div className="compare-name">{p.name}</div>
                                    <div className="compare-sub">{p.provider}</div>
                                </div>
                            ))}
                        </div>

                        <div className="compare-row">
                            <div className="compare-cell compare-label-cell">Monthly premium</div>
                            {plans.map((p) => (
                                <div key={p.id} className="compare-cell">${p.monthlyPremium}</div>
                            ))}
                        </div>

                        <div className="compare-row">
                            <div className="compare-cell compare-label-cell">Deductible</div>
                            {plans.map((p) => (
                                <div key={p.id} className="compare-cell">${p.deductible}</div>
                            ))}
                        </div>

                        <div className="compare-row">
                            <div className="compare-cell compare-label-cell">Description</div>
                            {plans.map((p) => (
                                <div key={p.id} className="compare-cell">{p.description}</div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
