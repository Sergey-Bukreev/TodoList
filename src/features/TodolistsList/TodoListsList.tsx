import React, {useEffect} from 'react';
import {TodoListDomaineType} from "../../state/todolists-reducer/todolists-reducer";
import {TaskType} from "../../api/todolists-api";
import {Grid, Paper} from "@material-ui/core";
import {TodoList} from "./Todolist/TodoList";
import {useAppWithRedux} from "../../hooks/useAppWithRedux";

export const TodoListsList = () => {
    const { todolists, tasks, removeTodoList, changeTodolistTitle,
            changeTaskTitle, changeStatus, changeFilter, addTask, removeTask, fetchTodoLists} = useAppWithRedux()

    useEffect(() => {
        fetchTodoLists()
    }, []);

    return (
        <>
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
        </>
    );
};

