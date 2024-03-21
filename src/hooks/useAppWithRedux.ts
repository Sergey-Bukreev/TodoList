import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {useCallback} from "react";
import {
    addTooListTC,
    changeTodoListFilterAC,
    fetchTodoListsTC,
    FilterValuesType,
    removeTodoListTC,
    TodoListDomaineType,
    updateTodoListTitleTC
} from "../state/todolists-reducer/todolists-reducer";
import {
    addTaskTC,
    removeTaskTC, TasksStateType,
    updateTaskStatusTC,
    updateTaskTitleTC
} from "../state/tasks-reducer/tasks-reducer";

import {TaskStatuses} from "../api/todolists-api";
import {RequestStatusType} from "../state/app-reducer/app-reducer";


export const useAppWithRedux = ()=> {
    const dispatch = useDispatch()
    const todolists:TodoListDomaineType[] = useSelector<AppRootStateType, TodoListDomaineType[]>(state => state.todolists)
    const tasks:TasksStateType = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isInitialized = useSelector<AppRootStateType, boolean>(state=> state.app.initialized)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const removeTodoList =  useCallback((todoId:string)=> {
        dispatch(removeTodoListTC(todoId))
    }, [dispatch])

    const removeTask=  useCallback((id:string, todoId:string)=> {
       dispatch(removeTaskTC(todoId, id))
    }, [dispatch])

    const addTask = useCallback((title:string, todoId:string) => {
        dispatch(addTaskTC(todoId,title))


    }, [dispatch])
    const changeFilter = useCallback((value:FilterValuesType, todoListId: string)=> {
        const action = changeTodoListFilterAC({id:todoListId, filter:value} )
        dispatch(action)
    }, [dispatch])
    const changeStatus = useCallback((taskId: string,status:TaskStatuses, todoId:string) => {
        dispatch(updateTaskStatusTC(todoId, taskId, status))
    }, [dispatch]) ;
    const changeTaskTitle = useCallback((taskId: string, newTitle:string, todoId:string) => {
        dispatch(updateTaskTitleTC(todoId, taskId, newTitle))
    }, [dispatch])
    const changeTodolistTitle = useCallback((id:string, newValue:string) => {
        dispatch(updateTodoListTitleTC(id, newValue))
    }, [dispatch])
    const addTodolist = useCallback((title:string) => {
        dispatch(addTooListTC(title))
    }, [dispatch])
    const fetchTodoLists = ()=> {
        dispatch(fetchTodoListsTC())
    }
    return {todolists, tasks, addTodolist,
            removeTodoList, changeTodolistTitle, changeTaskTitle,
            changeStatus, changeFilter, addTask,
            removeTask, fetchTodoLists, isInitialized, status, isLoggedIn}
}