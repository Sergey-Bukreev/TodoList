import React, {useEffect} from 'react';
import {TodoListDomaineType} from "../../state/todolists-reducer/todolists-reducer";
import {TaskType} from "../../api/todolists-api";
import {Grid, Paper} from "@material-ui/core";
import {TodoList} from "./Todolist/TodoList";
import {useAppWithRedux} from "../../hooks/useAppWithRedux";
type PropsType = {
    demo?: boolean
}
export const TodoListsList:React.FC<PropsType> = ({demo = false}) => {
    const { todolists, tasks, removeTodoList, changeTodolistTitle,
            changeTaskTitle, changeStatus, changeFilter, addTask, removeTask, fetchTodoLists} = useAppWithRedux()

    useEffect(() => {
        if(demo) { return}
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
                                            todolist={todoList}
                                            tasks={tasksForTodolist}
                                            removeTodoList={removeTodoList}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                            demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                })
            }
        </>
    );
};

