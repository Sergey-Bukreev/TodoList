
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType, SetTodoListActionType, todoId, todoId2} from "../todolists-reducer/todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoListsAPI, UpdateTaskType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "../store";


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
export const  fetchTasksTC = (todolistId:string)=> (dispatch:Dispatch<ActionType>)=> {
            todoListsAPI.getTasks(todolistId)
                .then((response)=> {
                    dispatch(setTasksAC(todolistId, response.data.items ))
                })
        }
export const removeTaskTC = (todoId:string, id:string) => (dispatch:Dispatch<ActionType>)=> {
           todoListsAPI.deleteTask(todoId, id)
               .then((response) => {
                   dispatch(removeTaskAC(todoId, id))
               })
        }
export const addTaskTC = (todoListId:string, title:string) => (dispatch:Dispatch<ActionType>)=> {
            todoListsAPI.createTask(todoListId, title)
                .then((response)=> {
                    dispatch(addTaskAC(response.data.data.item))
                })
        }
export const updateTaskStatusTC = (todoId:string, id:string, status:TaskStatuses) => (dispatch:Dispatch<ActionType>, getState: ()=> AppRootState)=> {
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
                    dispatch(changeTaskStatusAC(todoId, id, status))
                })
        }
export const updateTaskTitleTC = (todoId:string, id:string, title:string)=> (dispatch:Dispatch, getState: ()=> AppRootState)=> {
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
                    dispatch(changeTaskTitleAC(todoId, id, title))
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
export type TasksStateType = {
    [key:string]:Array<TaskType>
}