import {useNavigate} from "react-router-dom";
import type {ComparisonTrayProps} from "../util/types.ts";
import "../styles/comparePage.css"

export default function ComparisonTray(props: ComparisonTrayProps) {
    const navigate= useNavigate();

    const { selectedCount, onClear } = props;

    return (
        <div className="compare-tray">
            <div className="compare-tray-text">
                Selected for compare: <b>{selectedCount}</b>/3
            </div>

            <div className="compare-tray-actions">
                <button
                    className="trase-button compare-tray-btn"
                    disabled={ selectedCount === 0 || selectedCount === 1 }
                    onClick={() => navigate("/compare")}
                >
                    Compare
                </button>

                <button
                    className="compare-tray-clear"
                    disabled={selectedCount === 0}
                    onClick={onClear}
                >
                    Clear
                </button>
            </div>
        </div>
    );
}
