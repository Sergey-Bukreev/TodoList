
import {v1} from "uuid";
import {todoListsAPI, TodoListType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatus, SetStatusActionType} from "../app-reducer/app-reducer";

//state
export let todoId:string = v1()
export let todoId2:string = v1()
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

// thunk
export const fetchTodoListsTC = () =>  (dispatch:Dispatch<ActionType | SetStatusActionType>) => {
    dispatch(setAppStatus("loading"))
    todoListsAPI.getTodoLists()
                .then((response)=> {
                    dispatch(setTodoListsAC(response.data))
                    dispatch(setAppStatus("succeeded"))
                })
        }
export const removeTodoListTC = (todoListId:string) => (dispatch:Dispatch<ActionType | SetStatusActionType>) => {
    dispatch(setAppStatus("loading"))
    dispatch(changeTodoListEntityStatusAC(todoListId,"loading"))
    todoListsAPI.deleteTodoList(todoListId)
                .then((response)=> {
                    dispatch(removeTodoListAC(todoListId))
                })
        }
export const addTooListTC = (title:string) => (dispatch:Dispatch<ActionType | SetStatusActionType> ) => {
            dispatch(setAppStatus("loading"))
            todoListsAPI.createTodoList(title)
                .then((response)=>{
                    dispatch(addTodoListAC(response.data.data.item))
                    dispatch(setAppStatus("succeeded"))
                })

        }
export const updateTodoListTitleTC =(id:string, title:string) => (dispatch:Dispatch<ActionType>) => {
            todoListsAPI.updateTodolisttitle(id, title)
                .then((response)=> {
                    dispatch(changeTodoListTitleAC(id,title))
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
export type ActionType =
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | SetTodoListActionType
    | ReturnType<typeof changeTodoListEntityStatusAC>

