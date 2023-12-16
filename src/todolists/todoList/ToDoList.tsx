import React, {useState} from 'react';
import { Button } from "../../components/Button";
import {TasksList, TaskType} from "./TasksList";
import {FilterValuesType} from "../TodoLists";

export type TodoCardPropsType = {
    title: string;
    task: Array<TaskType>;
    id:string
    removeTask: (id: string) => void;
    changeFilter: (value:FilterValuesType) => void;
    addTask:(title:string) => void
};


export const ToDoList: React.FC<TodoCardPropsType> = ({ title, task,removeTask, changeFilter, addTask, }) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const handleAddTask = () => {
        addTask(newTaskTitle);
        setNewTaskTitle(''); // Очистить значение инпута после добавления задачи
    };

    return (
        <div className={"todoList"}>
            <h3>{title}</h3>
            <div>
                <input value={newTaskTitle} onChange={(e)=>setNewTaskTitle(e.currentTarget.value)}/>
                <Button name={"+"}  callBack={()=>handleAddTask() } />
            </div>
            <TasksList tasks={task} removeTask={removeTask} />
            <div>
                <Button name={"All"} callBack={()=>changeFilter("all")}/>
                <Button name={"Active"} callBack={()=>changeFilter("active")}/>
                <Button name={"Completed"} callBack={()=>changeFilter("completed")}/>
            </div>
        </div>
    );
};