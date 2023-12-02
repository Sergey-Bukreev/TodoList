import React from 'react';
import { Button } from "../../components/Button";
import {TasksList, TaskType} from "./TasksList";

type TodoCardPropsType = {
    title: string;
    tasks: Array<TaskType>;
};


export const ToDoCard: React.FC<TodoCardPropsType> = ({ title, tasks }) => {
    return (
        <div className={"todoList"}>
            <h3>{title}</h3>
            <div>
                <input />
                <Button name={"+"} />
            </div>
            <TasksList tasks={tasks} />
            <div>
                <Button name={"ALL"} />
                <Button name={"active"} />
                <Button name={"Completed"} />
            </div>
        </div>
    );
};