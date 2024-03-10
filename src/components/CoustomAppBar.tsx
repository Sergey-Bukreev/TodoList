import React from 'react';
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import { Menu } from '@material-ui/icons';
import {ErrorSnackBar} from "./ErrorSnackBar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {RequestStatusType} from "../state/app-reducer/app-reducer";

export const CustomAppBar = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
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
                    <Button color="inherit">Login</Button>
                </Typography>
            </Toolbar>
            {status === "loading" && <LinearProgress/>}
        </AppBar>
    );
};
