import {Dispatch} from "redux";
import {authAPI} from "../../api/todolists-api";
import {setIsLoginInAC} from "../auth-reducer/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type InitialStateType = {
    status:RequestStatusType
    error: string | null
    initialized:boolean
}
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type SetErrorActionType = ReturnType<typeof setAppError>
export type SetStatusActionType = ReturnType<typeof setAppStatus>


const initialState:InitialStateType = {
    status: "idle",
    error: null,
    initialized:false
}

const slice = createSlice({
    name:"app",
    initialState:initialState,
    reducers:{
        setAppError (state, action:PayloadAction<{error:string | null}>) {
            state.error = action.payload.error
        },
        setAppStatus (state,action:PayloadAction<{ status:RequestStatusType}> ) {
            state.status = action.payload.status
        },
        setAppInitialized (state,action:PayloadAction<{value:boolean}> ) {
            state.initialized = action.payload.value
        }

    }
})
export const appReducer = slice.reducer
export const {setAppError, setAppStatus, setAppInitialized } = slice.actions


/// THUNK
export const initializeAppTC = () => (dispatch:Dispatch) => {
authAPI.me()
    .then((response) => {
        if(response.data.resultCode === 0) {
            dispatch(setIsLoginInAC({value:true}))
        } else {

        }
        dispatch(setAppInitialized({value:true}))
    })
}
