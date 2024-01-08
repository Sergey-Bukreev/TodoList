import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "../App";

import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "../components/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import { Delete} from "@material-ui/icons";



type TodoListPropsType = {
    id:string
    title: string
    tasks: Array<TaskType>
    removeTodoList:(id:string)=>void
    changeTodolistTitle:(id:string, newValue:string)=> void
    removeTask: (taskId: string, todoId:string) => void
    changeFilter: (value: FilterValuesType, todoListId:string) => void
    addTask: (title: string, todoId:string) => void
    changeStatus:(taskId:string, isDone:boolean, todoId:string)=>void
    changeTaskTitle: (taskId:string, todoListId:string, newValue:string) => void

    filter:FilterValuesType

}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList: React.FC<TodoListPropsType> = (props) => {

    const removeTodoList = ()=> {props.removeTodoList(props.id)}
    const onAllClick = () => {props.changeFilter('all',props.id )};
    const onActiveClick = () => {props.changeFilter('active', props.id)};
    const onCompletedClick = () => {props.changeFilter('completed', props.id)};
    const addTask = (title:string) => {props.addTask(title, props.id )}
    const changeTodolistTitle = (title:string) => {
        props.changeTodolistTitle(props.id, title)
    }


    return (
        <div className="todoList">
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle} />
                <IconButton  onClick={() => props.removeTodoList( props.id)}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
                <div>
                    {
                        props.tasks.map((task) => {
                            const onChangeStatusHandler= (e:ChangeEvent<HTMLInputElement>) =>{
                                props.changeStatus(task.id, e.currentTarget.checked, props.id)
                            }
                            const onChangeTitleHandler= (newValue:string) =>{
                                props.changeTaskTitle(task.id,newValue, props.id)
                            }
                            return <div key={task.id} className={task.isDone ? "is-done" : ""}>
                                <Checkbox checked={task.isDone} onChange={onChangeStatusHandler} color={"primary"}/>
                                <EditableSpan title={task.title} onChange={onChangeTitleHandler} />
                                <IconButton  onClick={() => props.removeTask(task.id, props.id)}>
                                    <Delete />
                                </IconButton>
                            </div>
                        })
                    }
                </div>

                    <Button  onClick={onAllClick} variant={props.filter === "all" ? "contained" : "text"} color={"primary"} >All</Button>
                    <Button  onClick={onActiveClick} variant={props.filter === "active" ? "contained" : "text"} color={"primary"} >Active</Button>
                    <Button  onClick={onCompletedClick} variant={props.filter === "completed" ? "contained" : "text"} color={"primary"} >Completed</Button>
                </div>

    );
};


