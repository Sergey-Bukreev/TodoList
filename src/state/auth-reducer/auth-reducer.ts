import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {setAppStatus, SetErrorActionType, SetStatusActionType} from "../app-reducer/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/handleErrorUtils";

/// STATE
const initialState:InitialStateType = {isLoggedIn:false}

// ACTION
export const setIsLoginInAC = (value:boolean) => ({type:"SET-IS-LOGIN-IN", value:value} as const)

//THUNK
export  const loginTC = (data:LoginParamsType)=>(dispatch:Dispatch<ActionAuthType | SetStatusActionType | SetErrorActionType>) => {
    dispatch(setAppStatus("loading"))
    authAPI.login(data)
        .then((response)=> {
            if(response.data.resultCode === 0) {
                dispatch(setIsLoginInAC(true))
                dispatch(setAppStatus("succeeded"))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export  const logoutTC = ()=>(dispatch:Dispatch<ActionAuthType | SetStatusActionType | SetErrorActionType>) => {
    dispatch(setAppStatus("loading"))
    authAPI.logout()
        .then((response)=> {
            if(response.data.resultCode === 0) {
                dispatch(setIsLoginInAC(false))
                dispatch(setAppStatus("succeeded"))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// REDUCER
export const authReducer = (state:InitialStateType = initialState, action:ActionAuthType) => {
    switch (action.type) {
        case "SET-IS-LOGIN-IN":
            return {...state, isLoggedIn:action.value}
        default:
            return state

    }
}

/// TYPES
export type SetIsLoginType = ReturnType<typeof setIsLoginInAC>
export type ActionAuthType = SetIsLoginType
export type InitialStateType = { isLoggedIn: boolean }