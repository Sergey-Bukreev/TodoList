import {v1} from "uuid";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTasksAC, SetTasksActionType,
    tasksReducer
} from "./tasks-reducer";
import {TasksStateType} from "../../App/App";
import {
    addTodoListAC,
    AddTodoListActionType,
    removeTodoListAC,
    RemoveTodoListActionType, setTodoListsAC, SetTodoListsType
} from "../todolists-reducer/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

let todoId:string
let todoId2:string
let startState:TasksStateType

beforeEach(()=> {
     todoId = v1()
     todoId2 = v1()

     startState = {
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
})
test("correct task should  be removed", ()=> {

    const endState:TasksStateType = tasksReducer(startState, removeTaskAC(todoId, startState[todoId][0].id))

    expect(endState).not.toBe(startState)
    expect(startState[todoId]).not.toBe(endState[todoId])
    expect(endState[todoId]).toHaveLength(startState[todoId].length - 1);
    expect(startState[todoId2]).toEqual(endState[todoId2])
    expect(startState[todoId].length).not.toBe(endState[todoId].length)
    expect(startState[todoId2].length).toBe(endState[todoId2].length)

})

test("correct task should  be added", ()=> {

    let newTaskTitle: string = "NEW Task"
    const endState: TasksStateType = tasksReducer(startState, addTaskAC(todoId2, newTaskTitle))

    expect(startState).not.toBe(endState)
    expect(startState[todoId]).toEqual(endState[todoId])
    expect(endState[todoId2]).toHaveLength(startState[todoId2].length + 1);
    expect(endState[todoId2][3].title).toBe("NEW Task")
    expect(endState[todoId2][3].status).toBe(TaskStatuses.New)

})

test("correct task should change its status", ()=> {

    const endState:TasksStateType = tasksReducer(startState, changeTaskStatusAC(todoId, startState[todoId][2].id, TaskStatuses.Completed))

    expect(startState).not.toBe(endState)
    expect(startState[todoId]).not.toBe(endState[todoId])
    expect(startState[todoId2]).toEqual(endState[todoId2])
    expect(endState[todoId][0].status).toBe(startState[todoId][0].status)
    expect(endState[todoId][1].status).toBe(startState[todoId][1].status)
    expect(endState[todoId][2].status).toBe(TaskStatuses.Completed)

})

test("correct task should change it's title", ()=> {

    const newTaskTitle:string = "NEW Title for TAsk"
    const endState: TasksStateType = tasksReducer(startState, changeTaskTitleAC(todoId2, startState[todoId2][1].id, newTaskTitle))

    expect(startState).not.toEqual(endState)
    expect(startState[todoId]).toEqual(endState[todoId])
    expect(startState[todoId2]).not.toBe(endState[todoId2])
    expect(endState[todoId2][1].title).toBe("NEW Title for TAsk")
    expect(endState[todoId2][1].status).toBe(startState[todoId2][1].status)
    expect(endState[todoId2][0].title).toBe(startState[todoId2][0].title)
    expect(endState[todoId2][2].title).toBe(startState[todoId2][2].title)
})

test("new property with new array should be added when new todolist added", ()=> {

    const action:AddTodoListActionType = addTodoListAC("title no matter")
    const endState:TasksStateType = tasksReducer(startState, action)
    const keys:string[] = Object.keys(endState)
    const newKey = keys.find(key => key !== todoId && key !== todoId2)
    if(!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test("property with todolist should be deleted", ()=> {

    const action:RemoveTodoListActionType = removeTodoListAC(todoId2)
    const endState:TasksStateType = tasksReducer(startState, action)
    const keys:string[] = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todoId2]).toBeUndefined()

})

test("empty arrays should be added when we set todolists", ()=> {
    /// Тест Падает потому что перед каждым тестом заданно состояние которое не соотвктсвует
    /// состоянию данного теста. Для исправления нужно адаптировать каждый тест отдельно
    const action:SetTodoListsType = setTodoListsAC([
        {id: todoId, title: "What to learn", addedDate:"", order:1},
        {id: todoId2, title: "What to buy", addedDate:"", order:1}
    ])
    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState["1"]).toStrictEqual([])
    expect(endState["2"]).toStrictEqual([])

})

