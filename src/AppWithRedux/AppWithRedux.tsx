import React from 'react';
import '../App.css';

import {AddItemForm} from "../todoList/addItemForm/AddItemForm";
import {CustomAppBar} from "../components/CoustomAppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {useAppWithRedux} from "./hooks/useAppWithRedux";
import {TodoListDomaineType} from "../state/todolists-reducer/todolists-reducer";
import {TaskType} from "../api/todolists-api";
import {TodoList} from "../todoList/TodoList";





export type TasksStateType = {
    [key:string]:Array<TaskType>
}
const AppWithReducers = () => {

const {todolists, tasks, addTodolist,
    removeTodoList, changeTodolistTitle, changeTaskTitle,
    changeStatus, changeFilter, addTask, removeTask
} = useAppWithRedux()

    return (
        <div className="App">
            <CustomAppBar/>
            <Container>
                <Grid container style={{padding:"20px"}}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((todoList:TodoListDomaineType)=>{
                            let tasksForTodolist:TaskType[] = tasks[todoList.id];


                            return(<Grid item>
                                    <Paper style={{padding:"10px"}}>
                                        <TodoList   key={todoList.id}
                                                    id={todoList.id}
                                                    title={todoList.title}
                                                    tasks={tasksForTodolist}
                                                    removeTodoList={removeTodoList}
                                                    removeTask={removeTask}
                                                    changeFilter={changeFilter}
                                                    addTask={addTask}
                                                    changeStatus={changeStatus}
                                                    changeTaskTitle={changeTaskTitle}
                                                    changeTodolistTitle={changeTodolistTitle}
                                                    filter={todoList.filter}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>


            </Container>
        </div>
    );
}

export default AppWithReducers;
