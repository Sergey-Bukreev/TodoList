import {appReducer, InitialStateType, setAppError, setAppStatus} from "./app-reducer";
let startState:InitialStateType
beforeEach(()=> {
     startState = {
        status:"idle",
        error:null,
         initialized:false
    }
})
test("correct error message should be set ", ()=> {
const endState = appReducer(startState, setAppError({error: "some error"}))
    expect(endState.error).toBe("some error")
})
test("correct status should be set ", ()=> {
    const endState = appReducer(startState, setAppStatus({status:"loading"}))
    expect(endState.status).toBe("loading")
})