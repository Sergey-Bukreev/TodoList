import {setAppError, setAppStatus, SetErrorActionType, SetStatusActionType} from "../state/app-reducer/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";

export const handleServerAppError= <D>(data:ResponseType<D>, dispatch:Dispatch<SetErrorActionType | SetStatusActionType>)=> {

        if(data.messages.length) {
            dispatch(setAppError({error:data.messages[0]}))
        } else {
            dispatch(setAppError({error:"Some error occurred"}))

        }
     dispatch(setAppStatus({status:"failed"}))
}
export const handleServerNetworkError = (error:any, dispatch:Dispatch<SetErrorActionType | SetStatusActionType> )=> {
    dispatch(setAppError(error.message ? error.message : "Some error occurred"))
    dispatch(setAppStatus({status:"failed"}))
}