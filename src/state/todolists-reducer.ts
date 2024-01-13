import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType ={ type:"REMOVE-TODOLIST", id: string }
export type AddTodoListActionType ={ type:"ADD-TODOLIST", title:string}
export type ChangeTodoListTitleActionType = { type:"CHANGE-TODOLIST-TITLE", id: string, title:string }
export type ChangeTodoListFilterActionType = { type:"CHANGE-TODOLIST-FILTER", id: string, filter:FilterValuesType }
export type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType
export const todolistsReduser = (state:Array<TodoListType>, action:ActionType):Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
        {return state.filter(todolist => todolist.id !== action.id )}

        case "ADD-TODOLIST" :
        {return [...state, {id:v1(), title: action.title, filter:"all"}]}

        case "CHANGE-TODOLIST-TITLE":
        {const todolist = state.find(todolist=> todolist.id === action.id)
            if ( todolist) {
                todolist.title = action.title
            }
            return [...state]
        }

        case "CHANGE-TODOLIST-FILTER":
        {const todolist = state.find(todolist => todolist.id === action.id)
            if(todolist){
                todolist.filter = action.filter
            }
            return [...state]
        }

        default: throw new Error("I dont understand this action type")
    }
}
export const removeTodoListAC = (todoId:string):RemoveTodoListActionType=> {
    return {type:"REMOVE-TODOLIST", id:todoId}
}
export const addTodoListAC = (title:string):AddTodoListActionType=> {
    return {type:"ADD-TODOLIST", title:title}
}
export const changeTodoListTitleAC = ( id:string, title:string):ChangeTodoListTitleActionType=> {
    return {type:"CHANGE-TODOLIST-TITLE", id:id, title:title}
}
export const changeTodoListFilterAC = (id:string, filter:FilterValuesType):ChangeTodoListFilterActionType => {
    return {type:"CHANGE-TODOLIST-FILTER",id:id, filter:filter}
}