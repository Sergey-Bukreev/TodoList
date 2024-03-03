
import {v1} from "uuid";
import {todoListsAPI, TodoListType} from "../../api/todolists-api";
import {Dispatch} from "redux";

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListDomaineType = TodoListType & {filter:FilterValuesType}

export type RemoveTodoListActionType ={ type:"REMOVE-TODOLIST", id: string }
export type AddTodoListActionType ={ type:"ADD-TODOLIST", todoList:TodoListDomaineType}
export type ChangeTodoListTitleActionType = { type:"CHANGE-TODOLIST-TITLE", id: string, title:string }
export type ChangeTodoListFilterActionType = { type:"CHANGE-TODOLIST-FILTER", id: string, filter:FilterValuesType }
export type SetTodoListsType = {type:"SET-TODOLISTS", todoLists:TodoListType[]}

export type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType
                        | ChangeTodoListFilterActionType | SetTodoListsType


export let todoId:string = v1()
export let todoId2:string = v1()
const initialState: Array<TodoListDomaineType> = [
    {id: todoId, title: "What to learn", filter: "all", addedDate:"", order:1},
    {id: todoId2, title: "What to buy", filter: "all", addedDate:"", order:1}
]

export const removeTodoListAC = (todoId:string):RemoveTodoListActionType => {
    return {type:"REMOVE-TODOLIST", id:todoId}
}
export const addTodoListAC = (todoList:TodoListDomaineType):AddTodoListActionType=> {
    return {type:"ADD-TODOLIST", todoList}
}
export const changeTodoListTitleAC = ( id:string, title:string):ChangeTodoListTitleActionType=> {
    return {type:"CHANGE-TODOLIST-TITLE", id:id, title:title}
}
export const changeTodoListFilterAC = (id:string, filter:FilterValuesType):ChangeTodoListFilterActionType => {
    return {type:"CHANGE-TODOLIST-FILTER",id:id, filter:filter}
}
export const setTodoListsAC = (todoLists:TodoListType[]):SetTodoListsType => {
    return {type:"SET-TODOLISTS", todoLists:todoLists}
}

export const fetchTodoListsTC = () => {
    return ( (dispatch:Dispatch) => {
            todoListsAPI.getTodoLists()
                .then((response)=> {
                    dispatch(setTodoListsAC(response.data))
                })
        }
    )
}
export const removeTodoListTC = (todoListId:string) => {
    return (
        (dispatch:Dispatch) => {
            todoListsAPI.deleteTodoList(todoListId)
                .then((response)=> {
                    dispatch(removeTodoListAC(todoListId))
                })
        }
    )
}
export const addTooListTC = (title:string) => {
    return (
        (dispatch:Dispatch) => {
            todoListsAPI.createTodoList(title)
                .then((response)=>{
                    dispatch(addTodoListAC(response.data.data.item))
                })

        }
    )
}
export const updateTodoListTitleTC =(id:string, title:string) => {
    return (
        (dispatch:Dispatch) => {
            todoListsAPI.updateTodolisttitle(id, title)
                .then((response)=> {
                    dispatch(changeTodoListTitleAC(id,title))
                })

        }
    )
}
export const todolistsReduser = (state:Array<TodoListDomaineType> = initialState, action:ActionType):Array<TodoListDomaineType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
        {return state.filter(todolist => todolist.id !== action.id )}

        case "ADD-TODOLIST" :
        {return [action.todoList, ...state ]}

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

        case "SET-TODOLISTS": {
            return action.todoLists.map(todolist => {
                return {...todolist, filter:"all"}
            })
        }

        default:
            return state
    }
}
