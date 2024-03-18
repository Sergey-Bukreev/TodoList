import React, {useCallback} from 'react';
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import { Menu } from '@material-ui/icons';
import {ErrorSnackBar} from "./ErrorSnackBar/ErrorSnackBar";
import {useDispatch} from "react-redux";
import {logoutTC} from "../state/auth-reducer/auth-reducer";
import {useAppWithRedux} from "../hooks/useAppWithRedux";

export const CustomAppBar = () => {
    const dispatch = useDispatch()
   const {status, isLoggedIn} = useAppWithRedux()
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
