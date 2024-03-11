import React, {useCallback, useEffect} from 'react';
import {FilterValuesType} from "../../../App/App";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import { Delete} from "@material-ui/icons";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "../../../state/tasks-reducer/tasks-reducer";
import {TodoListDomaineType} from "../../../state/todolists-reducer/todolists-reducer";

export const TodoList: React.FC<TodoListPropsType> = React.memo(({demo = false, ...props}:TodoListPropsType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (demo ) {return}
        dispatch(fetchTasksTC(props.todolist.id))
    }, []);

    const onAllClick = useCallback(() => {props.changeFilter('all',props.todolist.id )}, [props.changeFilter, props.todolist.id]);
    const onActiveClick = useCallback(() => {props.changeFilter('active', props.todolist.id)}, [props.changeFilter, props.todolist.id]);
    const onCompletedClick = useCallback(() => {props.changeFilter('completed', props.todolist.id)}, [props.changeFilter, props.todolist.id]);
    const addTask = useCallback((title:string) => {props.addTask(title, props.todolist.id )}, [props.addTask, props.todolist.id])
    const changeTodolistTitle = useCallback((title:string) => {props.changeTodolistTitle(props.todolist.id, title)}, [props.changeTodolistTitle, props.todolist.id])
    const removeTodolist = () => {props.removeTodoList(props.todolist.id)}

    let tasksForTodolist:TaskType[] = props.tasks
    if (props.todolist.filter === "active") {tasksForTodolist = props.tasks.filter(task => task.status === TaskStatuses.New);}
    if (props.todolist.filter === "completed") {tasksForTodolist = props.tasks.filter(task => task.status === TaskStatuses.Completed);}
    return (
        <div className="todoList">
            <h3>
                <EditableSpan title={props.todolist.title} onChange={changeTodolistTitle} />
                <IconButton  onClick={removeTodolist} disabled={props.todolist.entityStatus === "loading"}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"}/>
                <div>
                    {tasksForTodolist.map((task:TaskType) => <Task key={task.id}
                                                                   task={task} todolistId={props.todolist.id}
                                                                   removeTask={props.removeTask}
                                                                   changeTaskTitle={props.changeTaskTitle}
                                                                   changeStatus={props.changeStatus}
                                                                />)}
                </div>
                    <Button  onClick={onAllClick} variant={props.todolist.filter === "all" ? "contained" : "text"} color={"primary"} >All</Button>
                    <Button  onClick={onActiveClick} variant={props.todolist.filter === "active" ? "contained" : "text"} color={"primary"} >Active</Button>
                    <Button  onClick={onCompletedClick} variant={props.todolist.filter === "completed" ? "contained" : "text"} color={"primary"} >Completed</Button>
                </div>

    );
});

type TodoListPropsType = {
    todolist:TodoListDomaineType
    tasks: Array<TaskType>
    removeTodoList:(id:string)=>void
    changeTodolistTitle:(id:string, newValue:string)=> void
    removeTask: (taskId: string, todoId:string) => void
    changeFilter: (value: FilterValuesType, todoListId:string) => void
    addTask: (title: string, todoId:string) => void
    changeStatus:(taskId:string, status:TaskStatuses, todoId:string)=>void
    changeTaskTitle: (taskId:string, todoListId:string, newValue:string) => void
    demo?:boolean
}
