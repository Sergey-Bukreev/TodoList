import {useState} from "react";
import {todoId, todoId2} from "../App/id-utils";

import {v1} from "uuid";
import {FilterValuesType, TodoListDomaineType} from "../state/todolists-reducer/todolists-reducer";

export const useTodolists = (onTodolistRemoved:(todoId:string)=> void, onTodolistAdded:(todoId:string)=> void) => {
    const [todoLists, setTodoLists]= useState<Array<TodoListDomaineType>>([
        {id: todoId, title: "What to learn", filter: "all", addedDate:"", order:1, entityStatus:"idle"},
        {id: todoId2, title: "What to buy", filter: "all", addedDate:"", order:1, entityStatus:"idle"}
    ])
    const removeTodoList = (todoId:string)=> {
        let filteredTodoLists = todoLists.filter(todolist=>todolist.id !==todoId)
        setTodoLists(filteredTodoLists)
        onTodolistRemoved(todoId)

    }
    const changeFilter = (value:FilterValuesType, todoListId: string)=> {
        let todoList = todoLists.find(todolist=>todolist.id === todoListId)
        if(todoList) {todoList.filter = value}
        setTodoLists([...todoLists])
    }
    const changeTodolistTitle = (id:string, newValue:string) => {
        const todoList = todoLists.find(todoList => todoList.id === id)
        if ( todoList) {
            todoList.title = newValue
            setTodoLists([...todoLists])
        }
    }
    const addTodolist = (title:string) => {
        let todoList: TodoListDomaineType = {id:v1(), title:title, filter:"all", addedDate:"", order:1, entityStatus:"idle"}
        setTodoLists([todoList, ...todoLists])
        onTodolistAdded(todoList.id)
    }
    return {todoLists, removeTodoList, addTodolist, changeTodolistTitle, changeFilter}
}