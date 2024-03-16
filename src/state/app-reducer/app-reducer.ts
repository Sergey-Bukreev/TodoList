import {Dispatch} from "redux";
import {authAPI} from "../../api/todolists-api";
import {setIsLoginInAC, SetIsLoginType} from "../auth-reducer/auth-reducer";

export type InitialStateType = {
    status:RequestStatusType
    error: string | null
    initialized:boolean
}
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type SetErrorActionType = ReturnType<typeof setAppError>
export type SetStatusActionType = ReturnType<typeof setAppStatus>
export type ActionType =    | SetErrorActionType
                            | SetStatusActionType
                            | ReturnType<typeof setAppInitialized>

const initialState:InitialStateType = {
    status: "idle",
    error: null,
    initialized:false
}
export const setAppError = (error: string | null) => ({type:"APP/SET-ERROR", error}  as const)
export const setAppStatus = (status:RequestStatusType) => ({type:"APP/SET-STATUS", status:status} as const)
export const setAppInitialized = (value:boolean) => ({type:"APP/SET-IN-INITIALIZED", value:value} as const)
export const initializeAppTC = () => (dispatch:Dispatch<ActionType | SetIsLoginType>) => {
authAPI.me()
    .then((response) => {
        if(response.data.resultCode === 0) {
            dispatch(setIsLoginInAC(true))
        } else {

        }
        dispatch(setAppInitialized(true))
    })
}
export const appReducer = (state:InitialStateType = initialState, action:ActionType) => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error:action.error}
        case "APP/SET-IN-INITIALIZED":
            return {...state, initialized: action.value}
        default:
            return {...state}
    }
}