import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../components/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../TodoList";

export type TaskPropsType = {
    task: TaskType
    todolistId: string
    changeStatus:(taskId:string, isDone:boolean, todoId:string)=>void
    changeTaskTitle:(taskId:string, todoListId:string, newValue:string) => void
    removeTask: (taskId: string, todoId:string) => void
}
export const Task: React.FC<TaskPropsType> = React.memo((props:TaskPropsType) => {
    const onChangeStatusHandler= (e:ChangeEvent<HTMLInputElement>) =>{props.changeStatus(props.task.id, e.currentTarget.checked, props.todolistId)}
    const onChangeTitleHandler= useCallback((newValue:string) =>{props.changeTaskTitle(props.task.id,newValue, props.todolistId)}, [props.changeStatus, props.task.id, props.todolistId])


    return (
        <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox checked={props.task.isDone} onChange={onChangeStatusHandler} color={"primary"}/>
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
        <IconButton  onClick={() => props.removeTask(props.task.id, props.todolistId)}>
            <Delete />
        </IconButton>
    </div>
    )
});

