import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./todoList/TodoList";


export type FilterValuesType = "all" | "active" | "completed";
const App = () => {
    const [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },

    ]);
    const [filter, setFilter] = useState<FilterValuesType>("all")
    const removeTask= (id:string)=> {
        let updateTasks = tasks.filter(task=>task.id !== id)
        setTasks(updateTasks)
    }

    const addTask = (title:string) => {
        let newTask = {id: v1(), title: title, isDone:false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }


    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(task => !task.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(task => task.isDone);
    }

   const changeFilter = (value:FilterValuesType)=> {setFilter(value)}
    const changeStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find((task) => task.id === taskId);
        if (task) {
            task.isDone = isDone

            setTasks([...tasks]);
        }
    };

    return (
        <div className="App">
            <TodoList title={"What to learn"}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
