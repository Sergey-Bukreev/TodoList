import React from 'react';
import '../App.css';
import {TodoList} from "../features/TodolistsList/Todolist/TodoList";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {CustomAppBar} from "../components/CoustomAppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {useTodolists} from "../hooks/useTodolists";
import {useTasks} from "../hooks/useTasks";
import {TaskStatuses, TaskType} from "../api/todolists-api";

export type FilterValuesType = "all" | "active" | "completed";
export type TasksStateType = { [key:string]:Array<TaskType> }

const App = () => {

    let {tasksObj,
        removeTask,
        addTask,
        changeTaskTitle,
        changeStatus,
        completelyRemoveTasksForTodolist,
        addStateForNewTodolist
    } = useTasks()

    let {todoLists,
        removeTodoList,
        addTodolist,
        changeFilter,
        changeTodolistTitle
    }=useTodolists( completelyRemoveTasksForTodolist, addStateForNewTodolist)

    return (
        <div className="App">
            <CustomAppBar/>
                <Container>
                    <Grid container style={{padding:"20px"}}>
                        <AddItemForm addItem={addTodolist} />
                    </Grid>
                    <Grid container spacing={3}>
                        {
                            todoLists.map((todoList)=>{
                                let tasksForTodolist = tasksObj[todoList.id];
                                if (todoList.filter === "active") {tasksForTodolist = tasksObj[todoList.id].filter(task => task.status === TaskStatuses.New);}
                                if (todoList.filter === "completed") {tasksForTodolist = tasksObj[todoList.id].filter(task => task.status === TaskStatuses.Completed);}

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

export default App;
