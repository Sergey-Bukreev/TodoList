import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todolistsReduser
} from "./todolists-reducer";
test("correct todolist  should be removed", ()=>  {
    let todoId:string = v1()
    let todoId2:string = v1()

    const startState : Array<TodoListType> = [
        {id: todoId, title: "What to learn", filter: "all"},
        {id: todoId2, title: "What to buy", filter: "all"}
    ]
    const endState: Array<TodoListType> = todolistsReduser(startState, removeTodoListAC(todoId))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoId2)
})

test("correct todolist should be added", ()=> {
    let todoId:string = v1()
    let todoId2:string = v1()

    const startState : Array<TodoListType> = [
        {id: todoId, title: "What to learn", filter: "all"},
        {id: todoId2, title: "What to buy", filter: "all"}
    ]
   let newTodolistTitle = "NEW Todolist"
    const endState: Array<TodoListType> = todolistsReduser(startState, addTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
    expect(endState[2].filter).toBe("all")
})

test("correct todolist should be changed its name", ()=> {
    let todoId:string = v1()
    let todoId2:string = v1()
    let newTodolistTitle = "NEW Todolist"

    const startState : Array<TodoListType> = [
        {id: todoId, title: "What to learn", filter: "all"},
        {id: todoId2, title: "What to buy", filter: "all"}
    ]

    const endState: Array<TodoListType> = todolistsReduser(startState, changeTodoListTitleAC(todoId2,newTodolistTitle))
    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let todoId:string = v1()
    let todoId2:string = v1()
    let newFilter: FilterValuesType = 'completed'

    const startState : Array<TodoListType> = [
        {id: todoId, title: "What to learn", filter: "all"},
        {id: todoId2, title: "What to buy", filter: "all"}
    ]

    const action = changeTodoListFilterAC(todoId2, newFilter)

    const endState = todolistsReduser(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
