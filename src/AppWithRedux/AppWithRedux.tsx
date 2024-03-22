import React, {useEffect} from 'react';
import '../App.css';
import {CustomAppBar} from "../components/CoustomAppBar";
import {CircularProgress, Container, Grid} from "@material-ui/core";
import {useAppWithRedux} from "../hooks/useAppWithRedux";
import {TodoListsList} from "../features/TodolistsList/TodoListsList";
import { Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {useDispatch} from "react-redux";
import {initializeAppTC} from "../state/app-reducer/app-reducer";

type PropsType = {
    demo?: boolean
}
const AppWithReducers = ({demo = false}:PropsType) => {
const  {isInitialized} = useAppWithRedux()
const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, []);

    if (!isInitialized) {
    return (
        <div style={{position:"fixed", textAlign:"center",  width:"100%", top:"40%"}} >
            <CircularProgress />
        </div>
    )
}

    return (

            <div className="App">
                <CustomAppBar/>
                <Container>
                    <Grid container style={{padding:"20px"}}>
                    </Grid>
                    <Grid container spacing={3}>
                            <Routes>
                                <Route path={'/'} element={<TodoListsList demo={demo} />} />
                                <Route path={'/login'} element={<Login />} />
                            </Routes>
                    </Grid>


                </Container>
            </div>


        );
    }

export default AppWithReducers;
