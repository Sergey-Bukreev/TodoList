import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../state/store";
import {useCallback} from "react";
import {
    addTodoListAC,
    AddTodoListActionType,
    changeTodoListFilterAC,
    ChangeTodoListFilterActionType, changeTodoListTitleAC, ChangeTodoListTitleActionType, FilterValuesType,
    removeTodoListAC,
    RemoveTodoListActionType, TodoListDomaineType
} from "../../state/todolists-reducer/todolists-reducer";
import {
    addTaskAC,
    AddTaskActionType, changeTaskStatusAC, ChangeTaskStatusActionType, changeTaskTitleAC, ChangeTaskTitleActionType,
    removeTaskAC,
    RemoveTaskActionType
} from "../../state/tasks-reducer/tasks-reducer";
import { TasksStateType} from "../AppWithRedux";
import {TaskStatuses} from "../../api/todolists-api";

export const useAppWithRedux = ()=> {
    const dispatch = useDispatch()
    const todolists:TodoListDomaineType[] = useSelector<AppRootState, TodoListDomaineType[]>(state => state.todolists)
    const tasks:TasksStateType = useSelector<AppRootState, TasksStateType>(state => state.tasks)

    const removeTodoList =  useCallback((todoId:string)=> {
        const action:RemoveTodoListActionType = removeTodoListAC(todoId)
        dispatch(action)
        dispatch(action)
    }, [dispatch])
    const removeTask=  useCallback((id:string, todoId:string)=> {
        const action:RemoveTaskActionType = removeTaskAC(todoId, id)
        dispatch(action)
    }, [dispatch])
    const addTask = useCallback((title:string, todoId:string) => {
        const action:AddTaskActionType = addTaskAC(todoId, title)
        dispatch(action)
    }, [dispatch])
    const changeFilter = useCallback((value:FilterValuesType, todoListId: string)=> {
        const action:ChangeTodoListFilterActionType = changeTodoListFilterAC(todoListId, value )
        dispatch(action)
    }, [dispatch])
    const changeStatus = useCallback((taskId: string,status:TaskStatuses, todoId:string) => {
        const action:ChangeTaskStatusActionType = changeTaskStatusAC(todoId, taskId, status )
        dispatch(action)
    }, [dispatch]) ;
    const changeTaskTitle = useCallback((taskId: string, newTitle:string, todoId:string) => {
        const action: ChangeTaskTitleActionType = changeTaskTitleAC(todoId, taskId, newTitle)
        dispatch(action)
    }, [dispatch])
    const changeTodolistTitle = useCallback((id:string, newValue:string) => {
        const action:ChangeTodoListTitleActionType = changeTodoListTitleAC(id, newValue)
        dispatch(action)
    }, [dispatch])
    const addTodolist = useCallback((title:string) => {
        const action:AddTodoListActionType = addTodoListAC(title)
        dispatch(action)
    }, [dispatch])
    return {todolists, tasks, addTodolist,
            removeTodoList, changeTodolistTitle, changeTaskTitle,
            changeStatus, changeFilter, addTask,
            removeTask }
}