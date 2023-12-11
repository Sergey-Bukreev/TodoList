import React from 'react';
import { Button } from "../../components/Button";
import {TasksList, TaskType} from "./TasksList";

export type TodoCardPropsType = {
    title: string;
    task: Array<TaskType>;
    id:number
    removeTask: (id: number) => void;
};


export const ToDoCard: React.FC<TodoCardPropsType> = ({ title, task,removeTask }) => {
    return (
        <div className={"todoList"}>
            <h3>{title}</h3>
            <div>
                <input />
                <Button name={"+"} />
            </div>
            <TasksList tasks={task} removeTask={removeTask} />
            <div>
                <Button name={"ALL"} />
                <Button name={"active"} />
                <Button name={"Completed"} />
            </div>
        </div>
    );
};