import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setOpenToast } from "../../redux/features/audioSlice";


const ToastComponent: React.FC = () => {
    const isOpenToast = useAppSelector(state => state.audio.isOpenToast)
    const dispatch = useAppDispatch()
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}

		dispatch(setOpenToast(false));
	};
    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={isOpenToast}
            onClose={handleClose}
            autoHideDuration={2000}
        >
            <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
                Chỉ dành cho tài khoản VIP !
            </Alert>
        </Snackbar>
    );
};

export default ToastComponent