import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../../App/App";
import {addTodoListAC,AddTodoListActionType, removeTodoListAC, RemoveTodoListActionType, setTodoListsAC, TodoListDomaineType} from "../todolists-reducer/todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/todolists-api";

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

    const endState:TasksStateType = tasksReducer(startState, removeTaskAC({todoId:todoId, id:startState[todoId][0].id} ))

    expect(endState).not.toBe(startState)
    expect(startState[todoId]).not.toBe(endState[todoId])
    expect(endState[todoId]).toHaveLength(startState[todoId].length - 1);
    expect(startState[todoId2]).toEqual(endState[todoId2])
    expect(startState[todoId].length).not.toBe(endState[todoId].length)
    expect(startState[todoId2].length).toBe(endState[todoId2].length)

})

test("correct task should  be added", ()=> {

    let newTask:TaskType = {
        id: v1(), title: "NewTask", status: TaskStatuses.New,
        todoListId:todoId2, startDate:"", deadline:"", addedDate:"",
        description:"", order:0, priority:TaskPriorities.Low
    }
    const endState: TasksStateType = tasksReducer(startState, addTaskAC({task:newTask}))

    expect(startState).not.toBe(endState)
    expect(startState[todoId]).toEqual(endState[todoId])
    expect(endState[todoId2]).toHaveLength(startState[todoId2].length + 1);
    expect(endState[todoId2][0].title).toBe(newTask.title)
    expect(endState[todoId2][0].status).toBe(TaskStatuses.New)

})

test("correct task should change its status", ()=> {

    const endState:TasksStateType = tasksReducer(startState, changeTaskStatusAC({todoId:todoId, id:startState[todoId][2].id, status:TaskStatuses.Completed} ))

    expect(startState).not.toBe(endState)
    expect(startState[todoId]).not.toBe(endState[todoId])
    expect(startState[todoId2]).toEqual(endState[todoId2])
    expect(endState[todoId][0].status).toBe(startState[todoId][0].status)
    expect(endState[todoId][1].status).toBe(startState[todoId][1].status)
    expect(endState[todoId][2].status).toBe(TaskStatuses.Completed)

})

test("correct task should change it's title", ()=> {

    const newTaskTitle:string = "NEW Title for TAsk"
    const endState: TasksStateType = tasksReducer(startState, changeTaskTitleAC({todoId:todoId2, id:startState[todoId2][1].id, title:newTaskTitle} ))

    expect(startState).not.toEqual(endState)
    expect(startState[todoId]).toEqual(endState[todoId])
    expect(startState[todoId2]).not.toBe(endState[todoId2])
    expect(endState[todoId2][1].title).toBe("NEW Title for TAsk")
    expect(endState[todoId2][1].status).toBe(startState[todoId2][1].status)
    expect(endState[todoId2][0].title).toBe(startState[todoId2][0].title)
    expect(endState[todoId2][2].title).toBe(startState[todoId2][2].title)
})

test("new property with new array should be added when new todolist added", ()=> {

    const newTodolist: TodoListDomaineType = {id: v1(), title: "title no matter", filter: "all", addedDate:"", order:1, entityStatus:"idle"}
    const action:AddTodoListActionType = addTodoListAC({todoList:newTodolist})
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

    const action:RemoveTodoListActionType = removeTodoListAC({todoId:todoId2})
    const endState:TasksStateType = tasksReducer(startState, action)
    const keys:string[] = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todoId2]).toBeUndefined()

})

test("empty arrays should be added when we set todolists", ()=> {

    const newTodoId = v1();
    const newTodoId2 = v1();

    const action = setTodoListsAC({todoLists:[
            { id: newTodoId, title: "What to learn", addedDate: "", order: 1 },
            { id: newTodoId2, title: "What to buy", addedDate: "", order: 1 }
        ]});

    const endState = tasksReducer({}, action);
    const keys = Object.keys(endState);

    expect(keys.length).toBe(2)
    expect(endState[newTodoId]).toStrictEqual([])
    expect(endState[newTodoId2]).toStrictEqual([])

})

