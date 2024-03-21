
import {todoListsAPI, TodoListType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatus, SetErrorActionType, SetStatusActionType} from "../app-reducer/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/handleErrorUtils";
import {fetchTasksTC} from "../tasks-reducer/tasks-reducer";
import {todoId, todoId2} from "../../App/id-utils";
import {ThunkDispatch} from "redux-thunk"
import {AppRootStateType} from "../store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
//state

const initialState: Array<TodoListDomaineType> = [
    {id: todoId, title: "What to learn", filter: "all", addedDate:"", order:1, entityStatus:"idle"},
    {id: todoId2, title: "What to buy", filter: "all", addedDate:"", order:1, entityStatus:"idle"}
]

const slice = createSlice({
    name:"todolists",
    initialState:initialState,
    reducers: {
        removeTodoListAC (state, action:PayloadAction<{todoId:string}>) {
           const index = state.findIndex(todolist => todolist.id === action.payload.todoId)
            if(index > -1) {
                state.splice(index, 1)
            }
        },
        addTodoListAC (state, action:PayloadAction<{todoList:TodoListDomaineType}>) {
            state.unshift(action.payload.todoList)
        },
        changeTodoListTitleAC (state, action:PayloadAction<{id:string, title:string}>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodoListFilterAC (state, action:PayloadAction<{id:string, filter:FilterValuesType}>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        setTodoListsAC (state, action:PayloadAction<{todoLists:TodoListType[]}>) {
            return action.payload.todoLists.map(todolist => ({...todolist, filter:"all", entityStatus:"idle"}))
        },
        changeTodoListEntityStatusAC (state, action:PayloadAction<{id:string, status:RequestStatusType}>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        },
        clearTodoListDataAC (state, action:PayloadAction<{}>) {
            return []
        }
    }
})

export const todolistsReduser = slice.reducer
export const {  removeTodoListAC, addTodoListAC,
                changeTodoListTitleAC, changeTodoListFilterAC,
                setTodoListsAC, changeTodoListEntityStatusAC,
                clearTodoListDataAC } = slice.actions



// thunk
export const fetchTodoListsTC = () =>  (dispatch:ThunkDispatch<AppRootStateType,void,ActionType | SetStatusActionType | SetErrorActionType>) => {
    dispatch(setAppStatus({status: "loading"}))
    todoListsAPI.getTodoLists()
                .then((response)=> {
                    dispatch(setTodoListsAC({todoLists:response.data}))
                    dispatch(setAppStatus({status: "succeeded"}))
                    response.data.forEach((todolists)=>{
                       dispatch(fetchTasksTC(todolists.id))
                    })

                })
                .catch((error)=> {
                    handleServerNetworkError(error, dispatch)
                })
        }

export const removeTodoListTC = (todoListId:string) => (dispatch:Dispatch<ActionType | SetStatusActionType>) => {
    dispatch(setAppStatus({status: "loading"}))
    dispatch(changeTodoListEntityStatusAC({id:todoListId, status:"loading"}))
    todoListsAPI.deleteTodoList(todoListId)
                .then((response)=> {
                    dispatch(removeTodoListAC({todoId:todoListId}))
                    dispatch(setAppStatus({status: "succeeded"}))
                })
                .catch((error)=> {
                    handleServerNetworkError(error, dispatch)
                })
        }
export const addTooListTC = (title:string) => (dispatch:Dispatch<ActionType | SetStatusActionType> ) => {
            dispatch(setAppStatus({status: "loading"}))
            todoListsAPI.createTodoList(title)
                .then((response)=>{
                   if(response.data.resultCode === 0) {
                       dispatch(addTodoListAC({todoList:response.data.data.item}))
                       dispatch(setAppStatus({status: "succeeded"}))
                   } else {
                       handleServerAppError(response.data, dispatch)
                   }

                })
                .catch((error)=> {
                    handleServerNetworkError(error, dispatch)
                })

        }
export const updateTodoListTitleTC =(id:string, title:string) => (dispatch:Dispatch<ActionType | SetStatusActionType>) => {
            dispatch(setAppStatus({status: "loading"}))
            todoListsAPI.updateTodolisttitle(id, title)
                .then((response)=> {
                   if(response.data.resultCode === 0) {
                       dispatch(changeTodoListTitleAC({id:id, title:title}))
                       dispatch(setAppStatus({status: "succeeded"}))
                   } else {
                       handleServerAppError(response.data, dispatch)
                   }

                })
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

