import {useState} from "react";
import {todoId, todoId2} from "../id-utils";
import {v1} from "uuid";
import {TasksStateType} from "../App";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/todolists-api";


export const useTasks = ()=> {
    const [tasksObj, setTasks] = useState<TasksStateType>({
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
    })
     const removeTask= (id:string, todoId:string)=> {
         let tasks:TaskType[] = tasksObj[todoId]
         tasksObj[todoId] = tasks.filter(task => task.id !== id)
         setTasks({...tasksObj})
     }
     const addTask = (title:string, todoId:string) => {
         let newTask:TaskType = {   id: v1(), title: title, status: TaskStatuses.New,
                                    todoListId:todoId2, startDate:"", deadline:"", addedDate:"",
                                    description:"", order:0, priority:TaskPriorities.Low
                                }
         let tasks:TaskType[] = tasksObj[todoId]
         tasksObj[todoId]= [newTask, ...tasks]
         setTasks({...tasksObj})
     }
     const changeStatus = (taskId: string, status:TaskStatuses, todoId:string) => {
         let tasks:TaskType[] = tasksObj[todoId]
         let task:TaskType | undefined  = tasks.find((task) => task.id === taskId);
         if (task) {
             task.status = status

             setTasks({...tasksObj});
         }
     };
     const changeTaskTitle = (taskId: string, newTitle:string, todoId:string) => {
         setTasks({...tasksObj,[todoId]:tasksObj[todoId].map(t=>t.id===taskId?{...t,title:newTitle}:{...t})});
     }
     const completelyRemoveTasksForTodolist = (todoId:string)=> {
         delete tasksObj[todoId]
         setTasks({...tasksObj})
     }
     const addStateForNewTodolist = (newTodoId:string)=> {
         setTasks({...tasksObj,[newTodoId]:[]})
     }
    return {tasksObj, removeTask, addTask, changeTaskTitle, changeStatus, completelyRemoveTasksForTodolist, addStateForNewTodolist}
}