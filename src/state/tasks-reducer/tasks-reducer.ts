import { TasksStateType } from "../../App";
import {v1} from "uuid";


export type RemoveTaskActionType = {
    type: "REMOVE-TASK";
    id: string;
    todoId: string;
};
export type AddTaskActionType = {
    type:"ADD-TASK"
    todoId: string
    title:string
}
export type ChangeTaskStatusActionType = {
    type:"CHANGE-TASK-STATUS"
    todoId:string
    id:string
    isDone:boolean
}
export type ChangeTaskTitleActionType = {
    type:"CHANGE-TASK-TITLE"
    todoId: string
    id:string
    title:string
}
export type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType ;
export const tasksReducer = (tasks: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...tasks,
                [action.todoId]: tasks[action.todoId].filter(task => task.id !== action.id),
            }
        case "ADD-TASK":
                return  {
                    ...tasks,
                    [action.todoId]: [...tasks[action.todoId], {id:v1(), title:action.title, isDone:false}]
                }
        case "CHANGE-TASK-STATUS":
            return {
                ...tasks,
                [action.todoId]: tasks[action.todoId].map(task =>
                    task.id === action.id ? { ...task, isDone: action.isDone } : task
                ),
            }
        case "CHANGE-TASK-TITLE":
            return  {
                ...tasks,
                [action.todoId]: tasks[action.todoId].map(task =>
                task.id === action.id ? {...task, title:action.title} : task
                )
            }

        default:
            throw new Error("I don't understand this action type");
    }
};

export const removeTaskAC = (todoId: string, id: string): RemoveTaskActionType => {
    return { type: "REMOVE-TASK", todoId, id };
};
export const addTaskAC = (todoId:string, title:string):AddTaskActionType => {
    return {type:"ADD-TASK", todoId, title}
}
export const changeTaskStatusAC = (todoId:string, id:string, isDone:boolean):ChangeTaskStatusActionType => {
    return {type:"CHANGE-TASK-STATUS", todoId, id, isDone}
}
export const changeTaskTitleAC = (todoId:string, id:string, title:string):ChangeTaskTitleActionType => {
    return {type:"CHANGE-TASK-TITLE", todoId, id, title}
}