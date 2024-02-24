import axios, {AxiosInstance} from "axios";
import {string} from "prop-types";

export type TodolistType = {
    id:string
    title:string
    addedDate:string
    order:number
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type ResponseType<D={}> = {
    resultCode:number
    messages: string[]
    data:D
}
type GetTasksResponse = {
   error:string | null
   totalCount:number
    items: TaskType[]
}
type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
const instance:AxiosInstance = axios.create({
    baseURL:"https://social-network.samuraijs.com/api/1.1/",
    withCredentials:true,
    headers:{
        "API-KEY": "0b0814e6-4fea-4499-b69a-f1627aad515f"
    }
})

export const todoListsAPI = {
    getTodoLists() {
     return   instance.get<TodolistType[]>("todo-lists")
    },
    createTodoList(title:string) {
        return instance.post<ResponseType<{item:TodolistType}>>("todo-lists",{title:title})
    },
    deleteTodoList(todoId:string) {
      return   instance.delete<ResponseType>(`todo-lists/${todoId}`)
    },
    updateTodolisttitle(todoId:string, title:string) {
      return   instance.put<ResponseType>(`todo-lists/${todoId}`,{title:title})
    },
    getTasks(todoId:string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todoId}/tasks`)
    },
    deleteTask(todoId:string, taskId:string) {
        return instance.delete<ResponseType>(`todo-lists/${todoId}/tasks/${taskId}`)
    },
    createTask(todoId:string, taskTitle:string) {
        return instance.post<ResponseType<TaskType>>(`todo-lists/${todoId}/tasks/`, {title:taskTitle})
    },
    updateTask(todoId:string, taskId:string, model:UpdateTaskType) {
        return instance.put<ResponseType>(`todo-lists/${todoId}/tasks/${taskId}`, model)
    }
}