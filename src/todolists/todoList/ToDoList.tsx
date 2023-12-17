import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { Button } from "../../components/Button";
import { TasksList, TaskType } from "./TasksList";
import { FilterValuesType } from "../TodoLists";

export type TodoCardPropsType = {
    title: string;
    task: Array<TaskType>;
    id: string;
    removeTask: (id: string) => void;
    changeFilter: (value: FilterValuesType) => void;
    addTask: (title: string) => void;
    changeStatus: (isDone: boolean, taskId: string) => void;
    activeFilter: FilterValuesType;
};

export const ToDoList: React.FC<TodoCardPropsType> = ({ title, task, removeTask, changeFilter, addTask, changeStatus, activeFilter }) => {
    let [newTaskTitle, setNewTaskTitle] = useState("");
    let [error, setError] = useState<string | null>(null);
    let [localActiveFilter, setLocalActiveFilter] = useState(activeFilter);

    const handleAddTask = () => {
        const trimmedNewTaskTitle = newTaskTitle.trim()
        if (trimmedNewTaskTitle !== "") {
            addTask(newTaskTitle);
            setNewTaskTitle('');
        } else {
            setError("Title is required")
        }
    };

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") { handleAddTask() }
    }

    const changeFilterHandler = (value: FilterValuesType) => {
        setLocalActiveFilter(value);
        changeFilter(value);
    };

    return (
        <div className={"todoList"}>
            <h3>{title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       className={error ? "error" : ""} />
                <Button name={"+"} callBack={handleAddTask} />
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <TasksList tasks={task} removeTask={removeTask} changeStatus={changeStatus} />
            <div>
                <Button name={"All"} callBack={() => changeFilterHandler("all")} className={localActiveFilter === "all" ? "active-filter" : ""} />
                <Button name={"Active"} callBack={() => changeFilterHandler("active")} className={localActiveFilter === "active" ? "active-filter" : ""} />
                <Button name={"Completed"} callBack={() => changeFilterHandler("completed")} className={localActiveFilter === "completed" ? "active-filter" : ""} />
            </div>
        </div>
    );
};
