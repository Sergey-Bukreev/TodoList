import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TaskType, TodoList} from "./todoList/TodoList";
import {AddItemForm} from "./todoList/AddItemForm";

type TodoListType = {
    id:string
    title:string
    filter:FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";
type TasksStateType = {
    [key:string]:Array<TaskType>
}
const App = () => {

    let todoId:string = v1()
    let todoId2:string = v1()
    const [todoLists, setTodoLists]= useState<Array<TodoListType>>([
        {id: todoId, title: "What to learn", filter: "all"},
        {id: todoId2, title: "What to buy", filter: "all"}
    ])
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

    const removeTodoList = (todoId:string)=> {
        let filteredTodoLists = todoLists.filter(todolist=>todolist.id !==todoId)
        setTodoLists(filteredTodoLists)
        delete tasksObj[todoId]
        setTasks({...tasksObj})
    }
    const removeTask= (id:string, todoId:string)=> {
        let tasks = tasksObj[todoId]
        tasksObj[todoId] = tasks.filter(task => task.id !== id)
        setTasks({...tasksObj})
    }
    const addTask = (title:string, todoId:string) => {
        let newTask = {id: v1(), title: title, isDone:false}
        let tasks = tasksObj[todoId]
        tasksObj[todoId]= [newTask, ...tasks]
        setTasks({...tasksObj})
    }
    const changeFilter = (value:FilterValuesType, todoListId: string)=> {
        let todoList = todoLists.find(todolist=>todolist.id === todoListId)
       if(todoList) {todoList.filter = value}
       setTodoLists([...todoLists])
   }
    const changeStatus = (taskId: string, isDone: boolean, todoId:string) => {
        let tasks = tasksObj[todoId]
        let task = tasks.find((task) => task.id === taskId);
        if (task) {
            task.isDone = isDone

            setTasks({...tasksObj});
        }
    };
    const addTodolist = (title:string) => {
        let todoList: TodoListType = {id:v1(), title:title, filter:"all"}
        setTodoLists([todoList, ...todoLists])
        setTasks({...tasksObj,[todoList.id]:[]})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} />
            {
                todoLists.map((todoList)=>{
                    let tasksForTodolist = tasksObj[todoList.id];
                    if (todoList.filter === "active") {tasksForTodolist = tasksObj[todoList.id].filter(task => !task.isDone);}
                    if (todoList.filter === "completed") {tasksForTodolist = tasksObj[todoList.id].filter(task => task.isDone);}

                    return(
                        <TodoList   key={todoList.id}
                                    id={todoList.id}
                                    title={todoList.title}
                                    tasks={tasksForTodolist}
                                    removeTodoList={removeTodoList}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeStatus={changeStatus}
                                    filter={todoList.filter}
                        />
                    )
                })
            }

        </div>
    );
}

export default App;
