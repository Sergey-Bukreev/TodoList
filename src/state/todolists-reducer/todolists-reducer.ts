import {FilterValuesType, TodoListType} from "../../App/App";
import {v1} from "uuid";

export type RemoveTodoListActionType ={ type:"REMOVE-TODOLIST", id: string }
export type AddTodoListActionType ={ type:"ADD-TODOLIST", title:string, todolistId:string}
export type ChangeTodoListTitleActionType = { type:"CHANGE-TODOLIST-TITLE", id: string, title:string }
export type ChangeTodoListFilterActionType = { type:"CHANGE-TODOLIST-FILTER", id: string, filter:FilterValuesType }
export type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType
export let todoId:string = v1()
export let todoId2:string = v1()
const initialState: Array<TodoListType> = [
    {id: todoId, title: "What to learn", filter: "all"},
    {id: todoId2, title: "What to buy", filter: "all"}
]
export const todolistsReduser = (state:Array<TodoListType> = initialState, action:ActionType):Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
        {return state.filter(todolist => todolist.id !== action.id )}

        case "ADD-TODOLIST" :
        {return [{id:action.todolistId, title: action.title, filter:"all"}, ...state ]}

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

        default:
            return state
    }
}
export const removeTodoListAC = (todoId:string):RemoveTodoListActionType=> {
    return {type:"REMOVE-TODOLIST", id:todoId}
}
export const addTodoListAC = (title:string):AddTodoListActionType=> {
    return {type:"ADD-TODOLIST", title:title, todolistId:v1()}
}
export const changeTodoListTitleAC = ( id:string, title:string):ChangeTodoListTitleActionType=> {
    return {type:"CHANGE-TODOLIST-TITLE", id:id, title:title}
}
export const changeTodoListFilterAC = (id:string, filter:FilterValuesType):ChangeTodoListFilterActionType => {
    return {type:"CHANGE-TODOLIST-FILTER",id:id, filter:filter}
}