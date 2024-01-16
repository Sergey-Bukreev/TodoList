import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../../App";
import {addTodoListAC, removeTodoListAC} from "../todolists-reducer/todolists-reducer";

test("correct task should  be removed", ()=> {
    let todoId:string = v1()
    let todoId2:string = v1()


    const startState:TasksStateType = {
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
    }
    const endState:TasksStateType = tasksReducer(startState, removeTaskAC(todoId, startState[todoId][0].id))

    expect(endState).not.toBe(startState)
    expect(startState[todoId]).not.toBe(endState[todoId])
    expect(endState[todoId]).toHaveLength(startState[todoId].length - 1);
    expect(startState[todoId2]).toEqual(endState[todoId2])
    expect(startState[todoId].length).not.toBe(endState[todoId].length)
    expect(startState[todoId2].length).toBe(endState[todoId2].length)

})

test("correct task should  be added", ()=> {
    let todoId: string = v1()
    let todoId2: string = v1()


    const startState: TasksStateType = {
        [todoId]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},

        ],
        [todoId2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Fruits", isDone: false},
        ]
    }

    let newTaskTitle: string = "NEW Task"
    const endState: TasksStateType = tasksReducer(startState, addTaskAC(todoId2, newTaskTitle))

    expect(startState).not.toBe(endState)
    expect(startState[todoId]).toEqual(endState[todoId])
    expect(endState[todoId2]).toHaveLength(startState[todoId2].length + 1);
    expect(endState[todoId2][3].title).toBe("NEW Task")
    expect(endState[todoId2][3].isDone).toBe(false)

})

test("correct task should change its status", ()=> {
    let todoId:string = v1()
    let todoId2:string = v1()

    const startState:TasksStateType = {
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
    }

    const endState:TasksStateType = tasksReducer(startState, changeTaskStatusAC(todoId, startState[todoId][2].id, true))

    expect(startState).not.toBe(endState)
    expect(startState[todoId]).not.toBe(endState[todoId])
    expect(startState[todoId2]).toEqual(endState[todoId2])
    expect(endState[todoId][0].isDone).toBe(startState[todoId][0].isDone)
    expect(endState[todoId][1].isDone).toBe(startState[todoId][1].isDone)
    expect(endState[todoId][2].isDone).toBe(true)

})

test("correct task should change it's title", ()=> {
    let todoId: string = v1()
    let todoId2: string = v1()

    const startState: TasksStateType = {
        [todoId]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},

        ],
        [todoId2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Fruits", isDone: false},
        ]
    }

    const newTaskTitle:string = "NEW Title for TAsk"
    const endState: TasksStateType = tasksReducer(startState, changeTaskTitleAC(todoId2, startState[todoId2][1].id, newTaskTitle))

    expect(startState).not.toEqual(endState)
    expect(startState[todoId]).toEqual(endState[todoId])
    expect(startState[todoId2]).not.toBe(endState[todoId2])
    expect(endState[todoId2][1].title).toBe("NEW Title for TAsk")
    expect(endState[todoId2][1].isDone).toBe(startState[todoId2][1].isDone)
    expect(endState[todoId2][0].title).toBe(startState[todoId2][0].title)
    expect(endState[todoId2][2].title).toBe(startState[todoId2][2].title)
})

test("new property with new array should be added when new todolist added", ()=> {
    let todoId: string = v1()
    let todoId2: string = v1()
    const startState: TasksStateType = {
        [todoId]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},

        ],
        [todoId2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Fruits", isDone: false},
        ]
    }
    const action = addTodoListAC("title no matter")
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    const newKey = keys.find(key => key !== todoId && key !== todoId2)
    if(!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test("property with todolist should be deleted", ()=> {
    let todoId: string = v1()
    let todoId2: string = v1()
    const startState: TasksStateType = {
        [todoId]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},

        ],
        [todoId2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Fruits", isDone: false},
        ]
    }

    const action = removeTodoListAC(todoId2)
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todoId2]).toBeUndefined()

})