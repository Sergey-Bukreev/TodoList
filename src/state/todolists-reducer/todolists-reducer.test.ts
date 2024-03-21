import {FilterValuesType} from "../../App/App";
import {v1} from "uuid";
import {
    addTodoListAC,
    changeTodoListEntityStatusAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    setTodoListsAC,
    TodoListDomaineType,
    todolistsReduser
} from "./todolists-reducer";
import {RequestStatusType} from "../app-reducer/app-reducer";

let todoId:string
let todoId2:string
let startState : Array<TodoListDomaineType>

beforeEach(()=> {
     todoId = v1()
     todoId2 = v1()

     startState = [
         {id: todoId, title: "What to learn", filter: "all", addedDate:"", order:1, entityStatus:"idle"},
         {id: todoId2, title: "What to buy", filter: "all", addedDate:"", order:1, entityStatus:"idle"}
     ]
})
test("correct todolist  should be removed", ()=>  {

    const endState: Array<TodoListDomaineType> = todolistsReduser(startState, removeTodoListAC({todoId:todoId}))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoId2)
})

test("correct todolist should be added", ()=> {

    const newTodolistTitle:string = "New Todolist Title"
   const newTodolist: TodoListDomaineType = {id: v1(), title: newTodolistTitle, filter: "all", addedDate:"", order:1, entityStatus:"idle"}
    const endState: Array<TodoListDomaineType> = todolistsReduser(startState, addTodoListAC({todoList:newTodolist}))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe("all")
})

test("correct todolist should be changed its name", ()=> {

    let newTodolistTitle = "NEW Todolist"
    const endState: Array<TodoListDomaineType> = todolistsReduser(startState, changeTodoListTitleAC({id:todoId2, title:newTodolistTitle}))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'completed'
    const action = changeTodoListFilterAC({id:todoId2, filter:newFilter})
    const endState:TodoListDomaineType[] = todolistsReduser(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

test("todolist should be set to the state", ()=> {
    const action = setTodoListsAC({todoLists:startState})
    const endState = todolistsReduser([], action)

    expect(endState.length).toBe(2)
})

test('correct status of todolist should be changed', () => {

    let newStatus: RequestStatusType = 'loading'
    const action = changeTodoListEntityStatusAC({id:todoId2, status:newStatus})
    const endState:TodoListDomaineType[] = todolistsReduser(startState, action)

    expect(endState[0].entityStatus).toBe('idle')
    expect(endState[1].entityStatus).toBe(newStatus)
})