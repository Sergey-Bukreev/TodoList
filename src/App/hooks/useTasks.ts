import {useState} from "react";
import {todoId, todoId2} from "../id-utils";
import {v1} from "uuid";
import {TasksStateType, TodoListType} from "../App";
import {TaskType} from "../../todoList/TodoList";

 export const useTasks = ()=> {
    const [tasksObj, setTasks] = useState<TasksStateType>({
        [todoId]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },

        ],
        [todoId2]:[
            { id: v1(), title: "Bread", isDone: true },
            { id: v1(), title: "Water", isDone: true },
            { id: v1(), title: "Fruits", isDone: false },
        ]

    })
     const removeTask= (id:string, todoId:string)=> {
         let tasks:TaskType[] = tasksObj[todoId]
         tasksObj[todoId] = tasks.filter(task => task.id !== id)
         setTasks({...tasksObj})
     }
     const addTask = (title:string, todoId:string) => {
         let newTask:TaskType = {id: v1(), title: title, isDone:false}
         let tasks:TaskType[] = tasksObj[todoId]
         tasksObj[todoId]= [newTask, ...tasks]
         setTasks({...tasksObj})
     }
     const changeStatus = (taskId: string, isDone: boolean, todoId:string) => {
         let tasks:TaskType[] = tasksObj[todoId]
         let task:TaskType | undefined  = tasks.find((task) => task.id === taskId);
         if (task) {
             task.isDone = isDone

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