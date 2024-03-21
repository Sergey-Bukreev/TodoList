
import {v1} from "uuid";
import {
    addTodoListAC,
     clearTodoListDataAC,
     removeTodoListAC,
    setTodoListsAC
} from "../todolists-reducer/todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoListsAPI, UpdateTaskType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store";
import { setAppStatus} from "../app-reducer/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/handleErrorUtils";
import {todoId, todoId2} from "../../App/id-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


// state
const initialState:TasksStateType = {
    [todoId]: [
        { id: v1(), title: "HTML&CSS", status:TaskStatuses.Completed,
            todoListId:todoId, startDate:"", deadline:"", addedDate:"",
            description:"", order:0, priority:TaskPriorities.Low
        },
        { id: v1(), title: "JS", status: TaskStatuses.Completed,
            todoListId:todoId, startDate:"", deadline:"", addedDate:"",
            description:"", order:0, priority:TaskPriorities.Low
        },
        { id: v1(), title: "ReactJS", status: TaskStatuses.New,
            todoListId:todoId, startDate:"", deadline:"", addedDate:"",
            description:"", order:0, priority:TaskPriorities.Low
        },

    ],
    [todoId2]:[
        { id: v1(), title: "Bread", status:TaskStatuses.Completed,
            todoListId:todoId2, startDate:"", deadline:"", addedDate:"",
            description:"", order:0, priority:TaskPriorities.Low
        },
        { id: v1(), title: "Water", status:TaskStatuses.Completed,
            todoListId:todoId2, startDate:"", deadline:"", addedDate:"",
            description:"", order:0, priority:TaskPriorities.Low
        },
        { id: v1(), title: "Fruits", status: TaskStatuses.New,
            todoListId:todoId2, startDate:"", deadline:"", addedDate:"",
            description:"", order:0, priority:TaskPriorities.Low
        },
    ]
}

const slice = createSlice({
    name:"tasks",
    initialState:initialState,
    reducers:{
        removeTaskAC (state, action:PayloadAction<{todoId: string, id: string}>) {
            const index = state[action.payload.todoId].findIndex(task => task.id === action.payload.id)
            if(index > -1) {
                state[action.payload.todoId].splice(index, 1)
            }
        },
        addTaskAC (state, action:PayloadAction<{task:TaskType}>) {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        changeTaskStatusAC (state, action:PayloadAction<{todoId:string, id:string, status:TaskStatuses}>) {
            const index = state[action.payload.todoId].findIndex(task => task.id === action.payload.id)
            if(index > -1) {
                state[action.payload.todoId][index].status = action.payload.status
            }

        },
        changeTaskTitleAC (state, action:PayloadAction<{todoId:string, id:string, title:string}>) {
            const index = state[action.payload.todoId].findIndex(task => task.id === action.payload.id)
            if(index > -1) {
                state[action.payload.todoId][index].title = action.payload.title
            }

        },
        setTasksAC (state, action:PayloadAction<{todolistId:string, tasks:TaskType[]}>) {
            state[action.payload.todolistId] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodoListAC, (state, action) => {
            state[action.payload.todoList.id] = []
        })
        builder.addCase(removeTodoListAC, (state, action)=> {
            delete state[action.payload.todoId]
        })
        builder.addCase(setTodoListsAC, (state, action)=> {
            action.payload.todoLists.forEach((todolist)=> {
                state[todolist.id] = []
            })
        })
        builder.addCase(clearTodoListDataAC, (state, action)=> {
           return {}
        })
    }
})

export const tasksReducer = slice.reducer
export const {  removeTaskAC, addTaskAC,
                changeTaskStatusAC, changeTaskTitleAC,
                setTasksAC} = slice.actions



//thunk
export const  fetchTasksTC = (todolistId:string)=> (dispatch:Dispatch)=> {

    dispatch(setAppStatus({status: "loading"}))
    todoListsAPI.getTasks(todolistId)
                .then((response)=> {
                    dispatch(setTasksAC({todolistId:todolistId, tasks:response.data.items } ))
                    dispatch(setAppStatus({status: "succeeded"}))

                })
        }
export const removeTaskTC = (todoId:string, id:string) => (dispatch:Dispatch)=> {
    dispatch(setAppStatus({status: "loading"}))
    todoListsAPI.deleteTask(todoId, id)
               .then((response) => {
                   dispatch(removeTaskAC({todoId:todoId, id:id}))
                   dispatch(setAppStatus({status: "succeeded"}))
               })
                .catch((error)=> {
                    handleServerNetworkError(error, dispatch)
                })
        }
export const addTaskTC = (todoListId:string, title:string) => (dispatch:Dispatch )=> {
    dispatch(setAppStatus({status: "loading"}))
    todoListsAPI.createTask(todoListId, title)
                .then((response)=> {
                    if(response.data.resultCode === 0) {
                        dispatch(addTaskAC({task:response.data.data.item}))
                        dispatch(setAppStatus({status: "succeeded"}))
                    } else {
                        handleServerAppError(response.data, dispatch)
                        }
                })
                .catch((error)=> {
                    handleServerNetworkError(error, dispatch)
                })
        }
export const updateTaskStatusTC = (todoId:string, id:string, status:TaskStatuses) => (dispatch:Dispatch, getState: ()=> AppRootStateType)=> {
          const state = getState()
           const task = state.tasks[todoId].find(t => t.id === id)
            if(!task) {
                console.warn("Task not found in the state")
                return;
            }
           const model: UpdateTaskType = {
               description: task.description,
               deadline: task.deadline,
               startDate:task.startDate,
               priority:task.priority,
               status:status,
               title:task.title
           }
            todoListsAPI.updateTask(todoId, id, model)
                .then((response)=> {
                    if(response.data.resultCode === 0) {
                        dispatch(changeTaskStatusAC({todoId:todoId, id:id, status:status}))
                    }
                })
                .catch((error)=> {
                    handleServerNetworkError(error, dispatch)
                })
        }
export const updateTaskTitleTC = (todoId:string, id:string, title:string)=> (dispatch:Dispatch, getState: ()=> AppRootStateType)=> {
            const state = getState()
            const task = state.tasks[todoId].find(t => t.id === id)
            if(!task) {
                console.warn("Task not found in the state")
                return;
            }
            const model: UpdateTaskType = {
                description: task.description,
                deadline: task.deadline,
                startDate:task.startDate,
                priority:task.priority,
                status:task.status,
                title:title
            }
            todoListsAPI.updateTask(todoId, id, model)
                .then((response)=> {
                    if(response.data.resultCode === 0) {
                        dispatch(changeTaskTitleAC({todoId:todoId, id:id, title:title}))
                    } else {
                        handleServerAppError(response.data, dispatch)
                    }

                })
                .catch((error)=> {
                    handleServerNetworkError(error, dispatch)
                })
        }



// types
// export type ActionType =
//     | ReturnType<typeof removeTaskAC>
//     | ReturnType<typeof addTaskAC>
//     | ReturnType<typeof changeTaskStatusAC>
//     | ReturnType<typeof changeTaskTitleAC>
//     | AddTodoListActionType
//     | RemoveTodoListActionType
//     | SetTodoListActionType
//     | ReturnType<typeof setTasksAC>
//     | ClearTodoListDataActionType
export type TasksStateType = {
    [key:string]:Array<TaskType>
}