import {IconButton, InputAdornment} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import type {ClearSearchProps} from "../util/types.ts";

export default function ClearSearch(props: ClearSearchProps) {

    const {onClear} = props;
    return (
        <InputAdornment position='end'>
            <IconButton
                size={'small'}
                onClick={onClear}
                edge={'end'}
            >
                <ClearIcon sx={{color: "rgba(255, 255, 255, 0.65)"}}/>
            </IconButton>

        </InputAdornment>
    );
}
