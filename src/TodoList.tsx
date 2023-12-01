import React from 'react';
import {Button} from "./Button";
type TodoListPropsType = {
    title: string
    task: Array<TaskType>
}

export type TaskType ={
    id: number
    title: string
    isDone: boolean
}

export const TodoList:React.FC<TodoListPropsType> = ({title, task}) =>
{

    const listItems:Array<JSX.Element> = []

    for (let i=0; i < task.length; i++) {
       const listItem:JSX.Element =
        <li>
            <input type="checkbox" checked={task[i].isDone}/>
            <span>{task[i].title}</span>
        </li>
        listItems.push(listItem)
    }

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
    );
};

