import React from 'react';
import { Button } from "../../components/Button";
import {TasksList, TaskType} from "./TasksList";
import {FilterValuesType} from "../TodoList";

export type TodoCardPropsType = {
    title: string;
    task: Array<TaskType>;
    id:number
    removeTask: (id: number) => void;
    changeFilter: (value:FilterValuesType) => void;
};


export const ToDoCard: React.FC<TodoCardPropsType> = ({ title, task,removeTask, changeFilter }) => {
    return (
        <div className={"todoList"}>
            <h3>{title}</h3>
            <div>
                <input />
                <Button name={"+"} />
            </div>
            <TasksList tasks={task} removeTask={removeTask} />
            <div>
               <button onClick={() => {changeFilter("all")}}>ALL</button>
                <button onClick={() => {changeFilter("active")}}>Active</button>
                <button onClick={() => {changeFilter("completed")}}>Completed</button>
            </div>
        </div>
    );
};