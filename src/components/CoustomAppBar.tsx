import React from 'react';
import { AppBar, Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import { Menu } from '@material-ui/icons';

export const CustomAppBar = () => {
    return (
        <AppBar position="static">
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
        </AppBar>
    );
};
