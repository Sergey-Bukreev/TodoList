import {Dispatch} from "redux";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {setAppStatus} from "../app-reducer/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/handleErrorUtils";
import {clearTodoListDataAC} from "../todolists-reducer/todolists-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {isLoggedIn:false}
const slice = createSlice({
    name:"auth",
    initialState:initialState,
    reducers: {
        setIsLoginInAC (state, action:PayloadAction<{value:boolean}>) {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer
export const {setIsLoginInAC} = slice.actions


//THUNK
export  const loginTC = (data:LoginParamsType)=>(dispatch:Dispatch) => {
    dispatch(setAppStatus({status:"loading"}))
    authAPI.login(data)
        .then((response)=> {
            if(response.data.resultCode === 0) {
                dispatch(setIsLoginInAC({value:true}))
                dispatch(setAppStatus({status:"succeeded"}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export  const logoutTC = ()=>(dispatch:Dispatch) => {
    dispatch(setAppStatus({status:"loading"}))
    authAPI.logout()
        .then((response)=> {
            if(response.data.resultCode === 0) {
                dispatch(setIsLoginInAC({value:false}))
                dispatch(setAppStatus({status:"succeeded"}))
                dispatch(clearTodoListDataAC({}))
            } else {
                handleServerAppError(response.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}






