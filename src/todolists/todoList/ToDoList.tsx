import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
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
    changeStatus: (isDone: boolean, taskId: string)=> void
};


export const ToDoList: React.FC<TodoCardPropsType> = ({ title, task,removeTask, changeFilter, addTask, changeStatus }) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const handleAddTask = () => {
        addTask(newTaskTitle);
        setNewTaskTitle('');
    };
    const onNewTitleChangeHandler=(e:ChangeEvent<HTMLInputElement>)=> {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler =(e:KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {handleAddTask()}
    }


    return (
        <div className={"todoList"}>
            <h3>{title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                        onKeyDown={onKeyPressHandler}/>
                <Button name={"+"}  callBack={handleAddTask} />
            </div>
            <TasksList tasks={task} removeTask={removeTask} changeStatus={changeStatus} />
            <div>
                <Button name={"All"} callBack={()=>changeFilter("all")}/>
                <Button name={"Active"} callBack={()=>changeFilter("active")}/>
                <Button name={"Completed"} callBack={()=>changeFilter("completed")}/>
            </div>
        </div>
    );
};