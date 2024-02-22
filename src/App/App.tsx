import React, {useState} from 'react';
import '../App.css';
import {TaskType, TodoList} from "../todoList/TodoList";
import {AddItemForm} from "../todoList/addItemForm/AddItemForm";
import {CustomAppBar} from "../components/CoustomAppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {useTodolists} from "./hooks/useTodolists";
import {useTasks} from "./hooks/useTasks";
export type TodoListType = {
    id:string
    title:string
    filter:FilterValuesType
}
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
                                if (todoList.filter === "active") {tasksForTodolist = tasksObj[todoList.id].filter(task => !task.isDone);}
                                if (todoList.filter === "completed") {tasksForTodolist = tasksObj[todoList.id].filter(task => task.isDone);}

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

export default App;
