import React,  {useEffect, useState} from "react";
import axios from "axios";

export default {
    title:"API"
}
const settings = {
    withCredentials:true,
    headers:{
        "API-KEY": "0b0814e6-4fea-4499-b69a-f1627aad515f"
    }
}
export const GetTodoLists = ()=> {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
            .then((response)=>{
                setState(response.data)
            })
    }, []);
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodoList = ()=> {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists",{title:"New TodoList"}, settings)
            .then((response)=>{
                setState(response.data)
            })
    }, []);
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = ()=> {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.delete("https://social-network.samuraijs.com/api/1.1/todo-lists/b2804ba2-d51c-4387-9ee6-3d19de87d8c9", settings)
            .then((response)=>{
                setState(response.data)
            })
    }, []);
    return <div>{JSON.stringify(state)}</div>
}