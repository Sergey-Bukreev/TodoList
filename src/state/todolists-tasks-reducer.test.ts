import {TasksStateType, TodoListType} from "../App/App";
import {ActionType, addTodoListAC, todolistsReduser} from "./todolists-reducer/todolists-reducer";
import {tasksReducer} from "./tasks-reducer/tasks-reducer";


test("ids should be equals", ()=> {
    const startTasksState :TasksStateType = {}
    const startTodoListsState:Array<TodoListType> = []

    const action:ActionType = addTodoListAC("new todolist")
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todolistsReduser(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListsState[0].id

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodoLists).toBe(action.todolistId)
})