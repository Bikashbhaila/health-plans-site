import {Alert, Snackbar} from "@mui/material";

import {MAX_COMPARE} from "../util/constants.ts";
import type {SnackBarWrapperProps} from "../util/types.ts";

export default function SnackBarWrapper(props: SnackBarWrapperProps) {

    const { open, onClose } = props;
    return (
        <Snackbar
            open={open}
            autoHideDuration={2500}
            onClose={onClose}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        >
            <Alert severity='warning' onClose={onClose} variant='filled'>
                You can only compare upto {MAX_COMPARE} plans at a time.
            </Alert>
        </Snackbar>
    );
}
