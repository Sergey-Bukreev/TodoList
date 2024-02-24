import React, {ChangeEvent, useEffect, useState} from "react";
import {todoListsAPI} from "./todolists-api";
import {number} from "prop-types";

export default {
    title:"TodoLists API"
}


export const GetTodoLists = ()=> {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.getTodoLists()
            .then((response)=>{
                setState(response.data)
            })
    }, []);
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodoList = ()=> {
    const [state, setState] = useState<any>(null)
    const [todoListTitle, setTodoListTitle] = useState<any>("")
    useEffect(() => {

    }, []);
    const createTodoList = () => {
        todoListsAPI.createTodoList(todoListTitle)
            .then((response)=>{
                setState(response.data)
            })
    }
    return  <div>
                {JSON.stringify(state)}
                <div>
                    <input placeholder={"TodolistTitle"} value={todoListTitle}
                            onChange={(event:ChangeEvent<HTMLInputElement>)=>{
                                setTodoListTitle(event.currentTarget.value)
                            }}/>
                    <button onClick={createTodoList}>Create Todolist</button>
                </div>
            </div>
}
export const DeleteTodolist = ()=> {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<any>(null)
    const deleteTodolist = ()=> {
        todoListsAPI.deleteTodoList(todoId)
            .then((response)=>{
                setState(response.data)
            })
    }
    return <div>
                {JSON.stringify(state)}
                <div>
                    <input placeholder={"Todolist Id"} value={todoId}
                            onChange={(event:ChangeEvent<HTMLInputElement>)=>{
                               setTodoId(event.currentTarget.value)
                            }}
                    />
                    <button onClick={deleteTodolist}>delete Todolist</button>
                </div>
            </div>
}
export const UpdateTodoListTitle = ()=> {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<any>("")
    const [todolistTitle, setTodolistTitle] = useState<any>("")

    const updateTodolist = ()=> {
        todoListsAPI.updateTodolisttitle(todoId, todolistTitle)
            .then((response)=>{
                setState(response.data)
            })
    }
    return <div>
                {JSON.stringify(state)}
                 <div>
                     <input placeholder={"Todolist Id"} value={todoId}
                            onChange={(event:ChangeEvent<HTMLInputElement>)=>{
                            setTodoId(event.currentTarget.value)
                            }}
                    />
                     <input placeholder={"Todolist Title"} value={todolistTitle}
                            onChange={(event:ChangeEvent<HTMLInputElement>)=>{
                                setTodolistTitle(event.currentTarget.value)
                            }}
                     />
                    <button onClick={updateTodolist}>update Todolist</button>
                </div>
            </div>
}
export const GetTasks = ()=> {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<any>("")

    const getTasks = ()=> {
        todoListsAPI.getTasks(todoId)
            .then((response)=>{
                setState(response.data)
    } )}
    return <div>
                {JSON.stringify(state)}
                <div>
                    <input placeholder={"todolistId"} value={todoId}
                             onChange={(event:ChangeEvent<HTMLInputElement>)=>
                            {setTodoId(event.currentTarget.value)}}
                    />

                    <button onClick={getTasks}>Get Tasks</button>
                 </div>
            </div>
}
export const DeleteTask = ()=> {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>("")
    const [todoId, setTodoId] = useState<any>("")

    const deleteTask = ()=> {
        todoListsAPI.deleteTask(todoId, taskId)
            .then((response)=> {
                setState(response.data)
            })
    }
    return  <div>
                {JSON.stringify(state)}
                <div>
                    <input placeholder={"todolistId"} value={todoId}
                           onChange={(event:ChangeEvent<HTMLInputElement>)=>
                           {setTodoId(event.currentTarget.value)}}
                    />
                    <input placeholder={"taskId"} value={taskId}
                            onChange={(event:ChangeEvent<HTMLInputElement>)=>
                            {setTaskId(event.currentTarget.value)}}/>
                    <button onClick={deleteTask}>Delete Task</button>
                </div>
            </div>
}
export const CreateTask = ()=> {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<any>("")
    const [todoId, setTodoId] = useState<any>("")

    const deleteTask = ()=> {
        todoListsAPI.createTask(todoId, taskTitle)
            .then((response)=> {
                setState(response.data)
            })
    }
    return  <div>
                {JSON.stringify(state)}
                <div>
                    <input placeholder={"todolistId"} value={todoId}
                            onChange={(event:ChangeEvent<HTMLInputElement>)=>
                            {setTodoId(event.currentTarget.value)}}
                    />
                     <input placeholder={"taskTitle"} value={taskTitle}
                            onChange={(event:ChangeEvent<HTMLInputElement>)=>
                            {setTaskTitle(event.currentTarget.value)}}
                     />
                    <button onClick={deleteTask}>Create Task</button>
                 </div>
            </div>
}
export const UpdateTask = ()=> {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>("")
    const [taskTitle, setTaskTitle] = useState<any>("new Title")
    const [taskDescription, setTaskDescription] = useState<any>("new Description")
    // const [taskCompleted, setTaskCompleted] = useState<any>(false)
    const [taskStatus, setTaskStatus] = useState<any>(0)
    const [taskPriority, setTaskPriority] = useState<any>(0)
    const [taskStartDate, setTaskStartDate] = useState<any>("")
    const [taskDeadline, setTaskDeadline] = useState<any>("")

    const updateTask = ()=> {
        todoListsAPI.updateTask(todoId, taskId, {
            title: taskTitle,
            description:taskDescription,
            status: taskStatus,
            priority: taskPriority,
            startDate: "",
            deadline: ""
        })
            .then((response)=> {
                setState(response.data)
            })
    }
    return  <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todoId}
                   onChange={(event:ChangeEvent<HTMLInputElement>)=>
                   {setTodoId(event.currentTarget.value)}}
            />
            <input placeholder={"taskId"} value={taskId}
                   onChange={(event:ChangeEvent<HTMLInputElement>)=>
                   {setTaskId(event.currentTarget.value)}}
            />
            <input placeholder={"taskTitle"} value={taskTitle}
                   onChange={(event:ChangeEvent<HTMLInputElement>)=>
                   {setTaskTitle(event.currentTarget.value)}}
            />
            <input placeholder={"Description"} value={taskDescription}
                   onChange={(event:ChangeEvent<HTMLInputElement>)=>
                   {setTaskDescription(event.currentTarget.value)}}
            />
            <input placeholder={"Status"} value={taskStatus} type={"number"}
                   onChange={(event:ChangeEvent<HTMLInputElement>)=>
                   {setTaskStatus(+event.currentTarget.value)}}
            />
            <input placeholder={"taskPriority"} value={taskPriority}
                   onChange={(event:ChangeEvent<HTMLInputElement>)=>
                   {setTaskPriority(+event.currentTarget.value)}}
            />

            <button onClick={updateTask}>Update Task</button>
        </div>
    </div>
}