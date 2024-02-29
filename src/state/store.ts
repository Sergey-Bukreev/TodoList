import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReduser} from "./todolists-reducer/todolists-reducer";
import {tasksReducer} from "./tasks-reducer/tasks-reducer";
import thunk from "redux-thunk"

const rootReducer = combineReducers({
    todolists: todolistsReduser,
     tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>

export let store = createStore(rootReducer, applyMiddleware(thunk));

