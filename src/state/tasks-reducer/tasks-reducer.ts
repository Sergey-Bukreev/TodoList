import { TasksStateType } from "../../App/App";
import {v1} from "uuid";
import {
    AddTodoListActionType,
    RemoveTodoListActionType,
    SetTodoListsType,
    todoId,
    todoId2
} from "../todolists-reducer/todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoListsAPI, UpdateTaskType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootState} from "../store";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK";
    id: string;
    todoId: string;
};
export type AddTaskActionType = {
    type:"ADD-TASK"
   task:TaskType
}
export type ChangeTaskStatusActionType = {
    type:"CHANGE-TASK-STATUS"
    todoId:string
    id:string
    status:TaskStatuses
}
export type ChangeTaskTitleActionType = {
    type:"CHANGE-TASK-TITLE"
    todoId: string
    id:string
    title:string
}
export type SetTasksActionType = {
    type: "SET-TASKS"
    todolistId: string
    tasks:TaskType[]
}
export type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType
                        | AddTodoListActionType | RemoveTodoListActionType | SetTodoListsType | SetTasksActionType ;

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

export const removeTaskAC = (todoId: string, id: string): RemoveTaskActionType => {
    return { type: "REMOVE-TASK", todoId, id };
};
export const addTaskAC = (task:TaskType):AddTaskActionType => {
    return {type:"ADD-TASK", task}
}
export const changeTaskStatusAC = (todoId:string, id:string, status:TaskStatuses):ChangeTaskStatusActionType => {
    return {type:"CHANGE-TASK-STATUS", todoId, id, status}
}
export const changeTaskTitleAC = (todoId:string, id:string, title:string):ChangeTaskTitleActionType => {
    return {type:"CHANGE-TASK-TITLE", todoId, id, title}
}
export const setTasksAC = (todolistId:string, tasks:TaskType[]):SetTasksActionType => {
    return {type:"SET-TASKS", todolistId, tasks}
}
export const  fetchTasksTC = (todolistId:string)=> {
    return (
        (dispatch:Dispatch)=> {
            todoListsAPI.getTasks(todolistId)
                .then((response)=> {
                    dispatch(setTasksAC(todolistId, response.data.items ))
                })
        }
    )
}
export const removeTaskTC = (todoId:string, id:string) => {
    return (
        (dispatch:Dispatch)=> {
           todoListsAPI.deleteTask(todoId, id)
               .then((response) => {
                   dispatch(removeTaskAC(todoId, id))
               })

        }
    )
}
export const addTaskTC = (todoListId:string, title:string) => {
    return (
        (dispatch:Dispatch)=> {
            todoListsAPI.createTask(todoListId, title)
                .then((response)=> {
                    dispatch(addTaskAC(response.data.data.item))
                })
        }
    )
}
export const updateTaskStatusTC = (todoId:string, id:string, status:TaskStatuses) => {
    return (
        (dispatch:Dispatch, getState: ()=> AppRootState)=> {
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
    )
}
export const updateTaskTitleTC = (todoId:string, id:string, title:string)=> {
    return (
        (dispatch:Dispatch, getState: ()=> AppRootState)=> {
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
    )
}

export const tasksReducer = (tasks: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...tasks,
                [action.todoId]: tasks[action.todoId].filter(task => task.id !== action.id),
            }
        case "ADD-TASK":
                return  {
                    ...tasks,
                    [action.task.todoListId]: [...tasks[action.task.todoListId], action.task
                                    ]
                }
        case "CHANGE-TASK-STATUS":
            return {
                ...tasks,
                [action.todoId]: tasks[action.todoId].map(task =>
                    task.id === action.id ? { ...task, status: action.status } : task
                ),
            }
        case "CHANGE-TASK-TITLE":
            return  {
                ...tasks,
                [action.todoId]: tasks[action.todoId].map(task =>
                task.id === action.id ? {...task, title:action.title} : task
                )
            }
        case "ADD-TODOLIST":
        const tasksCopy = {...tasks}
            tasksCopy[action.todoList.id] = []
            return tasksCopy

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
        case "SET-TASKS": {
            const stateCopy = {...tasks}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }

        default:
            return tasks
    }
};
