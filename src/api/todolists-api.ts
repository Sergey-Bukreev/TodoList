import axios, {AxiosInstance} from "axios";
import {TodoListDomaineType} from "../state/todolists-reducer/todolists-reducer";
import {number} from "prop-types";

const instance:AxiosInstance = axios.create({
    baseURL:"https://social-network.samuraijs.com/api/1.1/",
    withCredentials:true,
    headers:{
        "API-KEY": "0b0814e6-4fea-4499-b69a-f1627aad515f"
    }
})

// API
export const todoListsAPI = {
    getTodoLists() {
     return   instance.get<TodoListDomaineType[]>("todo-lists")
    },
    createTodoList(title:string) {
        return instance.post<ResponseType<{item:TodoListDomaineType}>>("todo-lists",{title:title})
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
        return instance.post<ResponseType<{item:TaskType}>>(`todo-lists/${todoId}/tasks/`, {title:taskTitle})
    },
    updateTask(todoId:string, taskId:string, model:UpdateTaskType) {
        return instance.put<ResponseType>(`todo-lists/${todoId}/tasks/${taskId}`, model)
    }
}

export const authAPI = {
    login(data:LoginParamsType) {
        return instance.post <ResponseType<{userId?:number}>>(`auth/login`, data)
    },
    logout(){
        return instance.delete <ResponseType<{userId?:number}>>(`auth/login`)
    },
    me() {
        return instance.get<ResponseType<{id:number, email:string, login: string}>>(`auth/me`)
    }
}

// types
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low =  0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TodoListType = {
    id:string
    title:string
    addedDate:string
    order:number
}
export type TaskType = {
    description: string
    title: string
    // completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type ResponseType<D={}> = {
    resultCode:number
    messages: string[]
    data:D
}
type GetTasksResponse = {
    error:string | null
    totalCount:number
    items: TaskType[]
}
export type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
export type LoginParamsType = {
    email:string
    password:string
    rememberMe:boolean
    captcha?:string
}