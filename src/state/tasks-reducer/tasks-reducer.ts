import { TasksStateType } from "../../App/App";
import {v1} from "uuid";
import {
    AddTodoListActionType,
    RemoveTodoListActionType, setTodoListsAC,
    SetTodoListsType,
    todoId,
    todoId2
} from "../todolists-reducer/todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoListsAPI} from "../../api/todolists-api";
import {Dispatch} from "redux";



export type RemoveTaskActionType = {
    type: "REMOVE-TASK";
    id: string;
    todoId: string;
};
export type AddTaskActionType = {
    type:"ADD-TASK"
    todoId: string
    title:string
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
export type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodoListActionType | RemoveTodoListActionType | SetTodoListsType | SetTasksActionType ;

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
                    [action.todoId]: [...tasks[action.todoId], {id:v1(), title:action.title, status:TaskStatuses.New,
                                        todoListId:action.todoId, startDate:"", deadline:"", addedDate:"",
                                        description:"", order:0, priority:TaskPriorities.Low}
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
            tasksCopy[action.todolistId] = []
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

export const removeTaskAC = (todoId: string, id: string): RemoveTaskActionType => {
    return { type: "REMOVE-TASK", todoId, id };
};
export const addTaskAC = (todoId:string, title:string):AddTaskActionType => {
    return {type:"ADD-TASK", todoId, title}
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