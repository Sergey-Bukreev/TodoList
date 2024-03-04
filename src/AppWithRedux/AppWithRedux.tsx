import React from 'react';
import '../App.css';
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {CustomAppBar} from "../components/CoustomAppBar";
import {Container, Grid} from "@material-ui/core";
import {useAppWithRedux} from "../hooks/useAppWithRedux";

import {TodoListsList} from "../features/TodolistsList/TodoListsList";


const AppWithReducers = () => {

    const { addTodolist} = useAppWithRedux()

    return (
            <div className="App">
                <CustomAppBar/>
                <Container>
                    <Grid container style={{padding:"20px"}}>
                        <AddItemForm addItem={addTodolist} />
                    </Grid>
                    <Grid container spacing={3}>
                        <TodoListsList />
                    </Grid>


                </Container>
            </div>
        );
    }

export default AppWithReducers;
