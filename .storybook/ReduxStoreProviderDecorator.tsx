import {Provider} from "react-redux";
import {AppRootStateType, rootReducer} from "../src/state/store";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {todoId, todoId2} from "../src/state/todolists-reducer/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../src/api/todolists-api";

const initialGlobalState:AppRootStateType = {
    todolists:[
        {id: todoId, title: "What to learn", filter: "all", addedDate:"", order:1, entityStatus:"idle"},
        {id: todoId2, title: "What to buy", filter: "all", addedDate:"", order:1, entityStatus:"loading"}
    ],
    tasks:{
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
},
app: {
    status: "idle",
        error: null
}
}
export const storyBookStore = createStore(rootReducer,initialGlobalState, applyMiddleware(thunk))
export const ReduxStoreProviderDecorator = (storyFn:any) =>{
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}