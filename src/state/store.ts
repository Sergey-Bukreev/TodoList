import {combineReducers, createStore} from "redux";
import {todolistsReduser} from "./todolists-reducer/todolists-reducer";
import {tasksReducer} from "./tasks-reducer/tasks-reducer";


const rootReducer = combineReducers({
    todolists: todolistsReduser,
    tasks: tasksReducer
})
export type AppRootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer);

// @ts-ignore
