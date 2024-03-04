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

export const TodoList: React.FC<TodoListPropsType> = React.memo((props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, []);

    const onAllClick = useCallback(() => {props.changeFilter('all',props.id )}, [props.changeFilter, props.id]);
    const onActiveClick = useCallback(() => {props.changeFilter('active', props.id)}, [props.changeFilter, props.id]);
    const onCompletedClick = useCallback(() => {props.changeFilter('completed', props.id)}, [props.changeFilter, props.id]);
    const addTask = useCallback((title:string) => {props.addTask(title, props.id )}, [props.addTask, props.id])
    const changeTodolistTitle = useCallback((title:string) => {props.changeTodolistTitle(props.id, title)}, [props.changeTodolistTitle, props.id])
    const removeTodolist = () => {props.removeTodoList(props.id)}

    let tasksForTodolist:TaskType[] = props.tasks
    if (props.filter === "active") {tasksForTodolist = props.tasks.filter(task => task.status === TaskStatuses.New);}
    if (props.filter === "completed") {tasksForTodolist = props.tasks.filter(task => task.status === TaskStatuses.Completed);}
    return (
        <div className="todoList">
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle} />
                <IconButton  onClick={removeTodolist}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
                <div>
                    {tasksForTodolist.map((task:TaskType) => <Task key={task.id}
                                                                   task={task} todolistId={props.id}
                                                                   removeTask={props.removeTask}
                                                                   changeTaskTitle={props.changeTaskTitle}
                                                                   changeStatus={props.changeStatus}
                                                                />)}
                </div>
                    <Button  onClick={onAllClick} variant={props.filter === "all" ? "contained" : "text"} color={"primary"} >All</Button>
                    <Button  onClick={onActiveClick} variant={props.filter === "active" ? "contained" : "text"} color={"primary"} >Active</Button>
                    <Button  onClick={onCompletedClick} variant={props.filter === "completed" ? "contained" : "text"} color={"primary"} >Completed</Button>
                </div>

    );
});

type TodoListPropsType = {
    id:string
    title: string
    tasks: Array<TaskType>
    removeTodoList:(id:string)=>void
    changeTodolistTitle:(id:string, newValue:string)=> void
    removeTask: (taskId: string, todoId:string) => void
    changeFilter: (value: FilterValuesType, todoListId:string) => void
    addTask: (title: string, todoId:string) => void
    changeStatus:(taskId:string, status:TaskStatuses, todoId:string)=>void
    changeTaskTitle: (taskId:string, todoListId:string, newValue:string) => void
    filter:FilterValuesType
}
