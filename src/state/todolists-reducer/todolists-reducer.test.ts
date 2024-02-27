import {FilterValuesType} from "../../App/App";
import {v1} from "uuid";
import {
    addTodoListAC,
    changeTodoListFilterAC, ChangeTodoListFilterActionType,
    changeTodoListTitleAC,
    removeTodoListAC, TodoListDomaineType,
    todolistsReduser
} from "./todolists-reducer";

let todoId:string
let todoId2:string
let startState : Array<TodoListDomaineType>

beforeEach(()=> {
     todoId = v1()
     todoId2 = v1()

     startState = [
         {id: todoId, title: "What to learn", filter: "all", addedDate:"", order:1},
         {id: todoId2, title: "What to buy", filter: "all", addedDate:"", order:1}
    ]
})
test("correct todolist  should be removed", ()=>  {

    const endState: Array<TodoListDomaineType> = todolistsReduser(startState, removeTodoListAC(todoId))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoId2)
})

test("correct todolist should be added", ()=> {

   let newTodolistTitle:string = "NEW Todolist"
    const endState: Array<TodoListDomaineType> = todolistsReduser(startState, addTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe("all")
})

test("correct todolist should be changed its name", ()=> {

    let newTodolistTitle = "NEW Todolist"
    const endState: Array<TodoListDomaineType> = todolistsReduser(startState, changeTodoListTitleAC(todoId2,newTodolistTitle))

    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = 'completed'
    const action:ChangeTodoListFilterActionType = changeTodoListFilterAC(todoId2, newFilter)
    const endState:TodoListDomaineType[] = todolistsReduser(startState, action)

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
