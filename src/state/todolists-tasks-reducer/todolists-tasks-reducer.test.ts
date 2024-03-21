import {tasksReducer, TasksStateType} from "../tasks-reducer/tasks-reducer";
import {addTodoListAC, TodoListDomaineType, todolistsReduser} from "../todolists-reducer/todolists-reducer";

import {v1} from "uuid";


test("ids should be equals", ()=> {
    const startTasksState :TasksStateType = {}
    const startTodoListsState:Array<TodoListDomaineType> = []

    const newTodolist: TodoListDomaineType = {id: v1(), title: "new todolist", filter: "all", addedDate:"", order:1, entityStatus:"idle"}
    const action = addTodoListAC({todoList:newTodolist})
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todolistsReduser(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.payload.todoList.id)
    expect(idFromTodoLists).toBe(action.payload.todoList.id)
})
