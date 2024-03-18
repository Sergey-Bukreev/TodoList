
import {v1} from "uuid";
import {todoListsAPI, TodoListType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatus, SetErrorActionType, SetStatusActionType} from "../app-reducer/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/handleErrorUtils";
import {fetchTasksTC} from "../tasks-reducer/tasks-reducer";
import {todoId, todoId2} from "../../App/id-utils";

//state

const initialState: Array<TodoListDomaineType> = [
    {id: todoId, title: "What to learn", filter: "all", addedDate:"", order:1, entityStatus:"idle"},
    {id: todoId2, title: "What to buy", filter: "all", addedDate:"", order:1, entityStatus:"idle"}
]

// action
export const removeTodoListAC = (todoId:string) => ({type:"REMOVE-TODOLIST", id:todoId} as const)
export const addTodoListAC = (todoList:TodoListDomaineType)=> ({type:"ADD-TODOLIST", todoList} as const)
export const changeTodoListTitleAC = ( id:string, title:string) => ({type:"CHANGE-TODOLIST-TITLE", id:id, title:title} as const)
export const changeTodoListFilterAC = (id:string, filter:FilterValuesType) => ({type:"CHANGE-TODOLIST-FILTER",id:id, filter:filter} as const)
export const setTodoListsAC = (todoLists:TodoListType[]) => ({type:"SET-TODOLISTS", todoLists:todoLists} as const)
export const changeTodoListEntityStatusAC = (id:string, status:RequestStatusType) => ({type:"CHANGE-TODOLIST-ENTITY-STATUS", id, status} as const)
export const clearTodoListDataAC = () => ({type:"CLEAR-TODOLIST-DATA"}  as const)

// thunk
export const fetchTodoListsTC = () =>  (dispatch:Dispatch<ActionType | SetStatusActionType | SetErrorActionType>) => {
    dispatch(setAppStatus("loading"))
    todoListsAPI.getTodoLists()
                .then((response)=> {
                    dispatch(setTodoListsAC(response.data))
                    dispatch(setAppStatus("succeeded"))
                    return response.data
                })
                .then((todolists) => {
                    todolists.forEach((todolists)=>{
                        fetchTasksTC(todolists.id)
                    })
                })
                .catch((error)=> {
                    handleServerNetworkError(error, dispatch)
                })
        }
export const removeTodoListTC = (todoListId:string) => (dispatch:Dispatch<ActionType | SetStatusActionType>) => {
    dispatch(setAppStatus("loading"))
    dispatch(changeTodoListEntityStatusAC(todoListId,"loading"))
    todoListsAPI.deleteTodoList(todoListId)
                .then((response)=> {
                    dispatch(removeTodoListAC(todoListId))
                    dispatch(setAppStatus("succeeded"))
                })
                .catch((error)=> {
                    handleServerNetworkError(error, dispatch)
                })
        }
export const addTooListTC = (title:string) => (dispatch:Dispatch<ActionType | SetStatusActionType> ) => {
            dispatch(setAppStatus("loading"))
            todoListsAPI.createTodoList(title)
                .then((response)=>{
                   if(response.data.resultCode === 0) {
                       dispatch(addTodoListAC(response.data.data.item))
                       dispatch(setAppStatus("succeeded"))
                   } else {
                       handleServerAppError(response.data, dispatch)
                   }

                })
                .catch((error)=> {
                    handleServerNetworkError(error, dispatch)
                })

        }
export const updateTodoListTitleTC =(id:string, title:string) => (dispatch:Dispatch<ActionType | SetStatusActionType>) => {
            dispatch(setAppStatus("loading"))
            todoListsAPI.updateTodolisttitle(id, title)
                .then((response)=> {
                   if(response.data.resultCode === 0) {
                       dispatch(changeTodoListTitleAC(id,title))
                       dispatch(setAppStatus("succeeded"))
                   } else {
                       handleServerAppError(response.data, dispatch)
                   }

                })
        }


// reducer
export const todolistsReduser = (state:Array<TodoListDomaineType> = initialState, action:ActionType):Array<TodoListDomaineType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
        return state.filter(todolist => todolist.id !== action.id)

        case "ADD-TODOLIST" :
        return [action.todoList, ...state ]

        case "CHANGE-TODOLIST-TITLE":
        return state.map(todoList => todoList.id === action.id ? {...todoList, title:action.title} : todoList)

        case "CHANGE-TODOLIST-FILTER":
        return state.map(todoList => todoList.id === action.id ? {...todoList, filter:action.filter} : todoList)

        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(todoList => todoList.id === action.id ? {...todoList, entityStatus:action.status} : todoList)

        case "SET-TODOLISTS":
            return action.todoLists.map(todolist => ({...todolist, filter:"all", entityStatus:"idle"}))
        case "CLEAR-TODOLIST-DATA":
            return []

        default:
            return state
    }
}

// types
export type FilterValuesType = "all" | "active" | "completed"
export type TodoListDomaineType = TodoListType & {filter:FilterValuesType, entityStatus:RequestStatusType}
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type SetTodoListActionType = ReturnType<typeof setTodoListsAC>
export type ClearTodoListDataActionType = ReturnType<typeof clearTodoListDataAC>
export type ActionType =
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | SetTodoListActionType
    | ReturnType<typeof changeTodoListEntityStatusAC>
    | ClearTodoListDataActionType

