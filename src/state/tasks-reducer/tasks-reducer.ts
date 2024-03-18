
import {v1} from "uuid";
import {
    AddTodoListActionType,
    ClearTodoListDataActionType,
    RemoveTodoListActionType,
    SetTodoListActionType
} from "../todolists-reducer/todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoListsAPI, UpdateTaskType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store";
import { SetErrorActionType, setAppStatus, SetStatusActionType} from "../app-reducer/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/handleErrorUtils";
import {todoId, todoId2} from "../../App/id-utils";


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

// action
export const removeTaskAC = (todoId: string, id: string) =>({ type: "REMOVE-TASK", todoId, id } as const)
export const addTaskAC = (task:TaskType) => ({type:"ADD-TASK", task} as const)
export const changeTaskStatusAC = (todoId:string, id:string, status:TaskStatuses) => ({type:"CHANGE-TASK-STATUS", todoId, id, status} as const)
export const changeTaskTitleAC = (todoId:string, id:string, title:string) =>({type:"CHANGE-TASK-TITLE", todoId, id, title} as const)
export const setTasksAC = (todolistId:string, tasks:TaskType[]) => ({type:"SET-TASKS", todolistId, tasks} as const)

//thunk
export const  fetchTasksTC = (todolistId:string)=> (dispatch:Dispatch<ActionType | SetStatusActionType>)=> {
    dispatch(setAppStatus("loading"))
    todoListsAPI.getTasks(todolistId)
                .then((response)=> {
                    dispatch(setTasksAC(todolistId, response.data.items ))
                    dispatch(setAppStatus("succeeded"))
                })
        }
export const removeTaskTC = (todoId:string, id:string) => (dispatch:Dispatch<ActionType | SetErrorActionType | SetStatusActionType>)=> {
    dispatch(setAppStatus("loading"))
    todoListsAPI.deleteTask(todoId, id)
               .then((response) => {
                   dispatch(removeTaskAC(todoId, id))
                   dispatch(setAppStatus("succeeded"))
               })
                .catch((error)=> {
                    handleServerNetworkError(error, dispatch)
                })
        }
export const addTaskTC = (todoListId:string, title:string) => (dispatch:Dispatch<ActionType | SetErrorActionType | SetStatusActionType> )=> {
    dispatch(setAppStatus("loading"))
    todoListsAPI.createTask(todoListId, title)
                .then((response)=> {
                    if(response.data.resultCode === 0) {
                        dispatch(addTaskAC(response.data.data.item))
                        dispatch(setAppStatus("succeeded"))
                    } else {
                        handleServerAppError(response.data, dispatch)
                        }
                })
                .catch((error)=> {
                    handleServerNetworkError(error, dispatch)
                })
        }
export const updateTaskStatusTC = (todoId:string, id:string, status:TaskStatuses) => (dispatch:Dispatch<ActionType>, getState: ()=> AppRootStateType)=> {
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
                        dispatch(changeTaskStatusAC(todoId, id, status))
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
                        dispatch(changeTaskTitleAC(todoId, id, title))
                    } else {
                        handleServerAppError(response.data, dispatch)
                    }

                })
                .catch((error)=> {
                    handleServerNetworkError(error, dispatch)
                })
        }

// reducer
export const tasksReducer = (tasks: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...tasks, [action.todoId]: tasks[action.todoId].filter(task => task.id !== action.id),}

        case "ADD-TASK":
                return  {...tasks, [action.task.todoListId]: [...tasks[action.task.todoListId], action.task] }

        case "CHANGE-TASK-STATUS":
            return {...tasks, [action.todoId]: tasks[action.todoId].map(task => task.id === action.id ? { ...task, status: action.status } : task) }

        case "CHANGE-TASK-TITLE":
            return  {...tasks, [action.todoId]: tasks[action.todoId].map(task => task.id === action.id ? {...task, title:action.title} : task)}

        case "ADD-TODOLIST":
            return {...tasks, [action.todoList.id]: [] }

        case "REMOVE-TODOLIST":
            const stateCopy = {...tasks}
            delete stateCopy[action.id]
            return stateCopy

        case "SET-TODOLISTS": {
          const stateCopy = {...tasks}
            action.todoLists.forEach(todolist => {
                stateCopy[todolist.id] = []
            })
            return stateCopy
        }
        case "SET-TASKS":
            return {...tasks, [action.todolistId] : action.tasks}
        case "CLEAR-TODOLIST-DATA":
            return {}

        default:
            return tasks
    }
};

// types
export type ActionType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListActionType
    | ReturnType<typeof setTasksAC>
    | ClearTodoListDataActionType
export type TasksStateType = {
    [key:string]:Array<TaskType>
}