import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReduser} from "./todolists-reducer/todolists-reducer";
import {tasksReducer} from "./tasks-reducer/tasks-reducer";
import thunk from "redux-thunk"
import {appReducer} from "./app-reducer/app-reducer";
import {authReducer} from "./auth-reducer/auth-reducer";

export const rootReducer = combineReducers({
    todolists: todolistsReduser,
     tasks: tasksReducer,
    app:appReducer,
    auth:authReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer, applyMiddleware(thunk));

