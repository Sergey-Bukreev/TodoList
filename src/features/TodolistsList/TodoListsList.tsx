import React, {useEffect} from 'react';
import {TodoListDomaineType} from "../../state/todolists-reducer/todolists-reducer";
import {TaskType} from "../../api/todolists-api";
import {Grid, Paper} from "@material-ui/core";
import {TodoList} from "./Todolist/TodoList";
import {useAppWithRedux} from "../../hooks/useAppWithRedux";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {Navigate} from "react-router-dom";
type PropsType = {
    demo?: boolean
}
export const TodoListsList:React.FC<PropsType> = ({demo = false}) => {

    const { todolists, tasks, removeTodoList, changeTodolistTitle,
            changeTaskTitle, changeStatus, changeFilter, addTask, removeTask, fetchTodoLists, addTodolist} = useAppWithRedux()

    useEffect(() => {
        if(demo || !isLoggedIn) { return}
        fetchTodoLists()
    }, []);

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    if(!isLoggedIn) {
        return <Navigate to={"/login"} />
    }

    return (
        <>
               <AddItemForm addItem={addTodolist} />
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

