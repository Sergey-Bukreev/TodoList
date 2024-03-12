export type InitialStateType = {
    status:RequestStatusType
    error: string | null
}
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type SetErrorActionType = ReturnType<typeof setAppError>
export type SetStatusActionType = ReturnType<typeof setAppStatus>
export type ActionType =    | SetErrorActionType
                            | SetStatusActionType

const initialState:InitialStateType = {
    status: "idle",
    error: null
}
export const setAppError = (error: string | null) => ({type:"APP/SET-ERROR", error}  as const)
export const setAppStatus = (status:RequestStatusType) => ({type:"APP/SET-STATUS", status:status} as const)
export const appReducer = (state:InitialStateType = initialState, action:ActionType) => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error:action.error}
        default:
            return {...state}
    }
}