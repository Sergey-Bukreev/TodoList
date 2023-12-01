import React from 'react';
import {Button} from "./Button";
type TodoCardPropsType = {
    title: string
    task: Array<TaskType>

}

export type TaskType ={
    id: number
    title: string
    isDone: boolean
}

export const ToDoCard:React.FC<TodoCardPropsType> = ({title, task}) =>
{
    const listItems: Array<JSX.Element> = task.map((task) => (
        <li key={task.id}>
            <input type="checkbox" checked={task.isDone} />
            <span>{task.title}</span>
        </li>
    ));


    return (
        <div className={"todoList"}>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button name={"+"} />
            </div>
            <ul>
                {listItems}
            </ul>
            <div>
                <Button name={"ALL"} />
                <Button name={"active"} />
                <Button name={"Completed"} />
            </div>
        </div>

    )}
