import React, {useCallback} from 'react';
import '../App.css';
import {TaskType, TodoList} from "../todoList/TodoList";
import {AddItemForm} from "../todoList/addItemForm/AddItemForm";
import {CustomAppBar} from "../components/CoustomAppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {
    addTodoListAC,
    AddTodoListActionType,
    changeTodoListFilterAC,
    ChangeTodoListFilterActionType, changeTodoListTitleAC, ChangeTodoListTitleActionType,
    removeTodoListAC,
    RemoveTodoListActionType,

} from "../state/todolists-reducer/todolists-reducer";
import {
    addTaskAC,
    AddTaskActionType, changeTaskStatusAC, ChangeTaskStatusActionType, changeTaskTitleAC, ChangeTaskTitleActionType,
    removeTaskAC,
    RemoveTaskActionType,

} from "../state/tasks-reducer/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../state/store";
import {useAppWithRedux} from "./hooks/useAppWithRedux";

export type TodoListType = {
    id:string
    title:string
    filter:FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";
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
                        todolists.map((todoList:TodoListType)=>{
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
