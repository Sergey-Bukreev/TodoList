import React, {useCallback} from 'react';
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import { Menu } from '@material-ui/icons';
import {ErrorSnackBar} from "./ErrorSnackBar/ErrorSnackBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {RequestStatusType} from "../state/app-reducer/app-reducer";
import {logoutTC} from "../state/auth-reducer/auth-reducer";

export const CustomAppBar = () => {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const logoutHandler = useCallback(()=>{
        dispatch(logoutTC())
    }, [] )

    return (
        <AppBar position="static">
            <ErrorSnackBar />
            <Toolbar>
                <IconButton edge="start" color="inherit">
                    <Menu />
                </IconButton>
                <Typography variant="h6">
                    Todolist
                </Typography>
                <Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button> }
                </Typography>
            </Toolbar>
            {status === "loading" && <LinearProgress/>}
        </AppBar>
    );
};
