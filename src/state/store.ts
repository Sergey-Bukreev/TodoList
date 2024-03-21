import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReduser} from "./todolists-reducer/todolists-reducer";
import {tasksReducer} from "./tasks-reducer/tasks-reducer";
import thunk, { ThunkMiddleware } from "redux-thunk"
import {appReducer} from "./app-reducer/app-reducer";
import {authReducer} from "./auth-reducer/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    todolists: todolistsReduser,
     tasks: tasksReducer,
    app:appReducer,
    auth:authReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

// export let store = createStore(rootReducer, applyMiddleware(thunk));
export const store = configureStore({
    reducer:rootReducer,
    middleware:getDefaultMiddleware =>  getDefaultMiddleware({serializableCheck: false, thunk: true}),

})




