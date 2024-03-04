
import {v1} from "uuid";
import {todoListsAPI, TodoListType} from "../../api/todolists-api";
import {Dispatch} from "redux";

//state
export let todoId:string = v1()
export let todoId2:string = v1()
const initialState: Array<TodoListDomaineType> = [
    {id: todoId, title: "What to learn", filter: "all", addedDate:"", order:1},
    {id: todoId2, title: "What to buy", filter: "all", addedDate:"", order:1}
]

// action
export const removeTodoListAC = (todoId:string) => ({type:"REMOVE-TODOLIST", id:todoId} as const)
export const addTodoListAC = (todoList:TodoListDomaineType)=> ({type:"ADD-TODOLIST", todoList} as const)
export const changeTodoListTitleAC = ( id:string, title:string) => ({type:"CHANGE-TODOLIST-TITLE", id:id, title:title} as const)
export const changeTodoListFilterAC = (id:string, filter:FilterValuesType) => ({type:"CHANGE-TODOLIST-FILTER",id:id, filter:filter} as const)
export const setTodoListsAC = (todoLists:TodoListType[]) => ({type:"SET-TODOLISTS", todoLists:todoLists} as const)

// thunk
export const fetchTodoListsTC = () =>  (dispatch:Dispatch<ActionType>) => {
            todoListsAPI.getTodoLists()
                .then((response)=> {
                    dispatch(setTodoListsAC(response.data))
                })
        }
export const removeTodoListTC = (todoListId:string) => (dispatch:Dispatch<ActionType>) => {
            todoListsAPI.deleteTodoList(todoListId)
                .then((response)=> {
                    dispatch(removeTodoListAC(todoListId))
                })
        }
export const addTooListTC = (title:string) => (dispatch:Dispatch<ActionType>) => {
            todoListsAPI.createTodoList(title)
                .then((response)=>{
                    dispatch(addTodoListAC(response.data.data.item))
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

        case "SET-TODOLISTS":
            return action.todoLists.map(todolist => ({...todolist, filter:"all"}))

        default:
            return state
    }
}

// types
export type FilterValuesType = "all" | "active" | "completed"
export type TodoListDomaineType = TodoListType & {filter:FilterValuesType}
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type SetTodoListActionType = ReturnType<typeof setTodoListsAC>
export type ActionType =
    | RemoveTodoListActionType
    | AddTodoListActionType
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | SetTodoListActionType

