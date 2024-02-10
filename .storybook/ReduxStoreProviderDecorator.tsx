import {Provider} from "react-redux";
import {store} from "../src/state/store";

export const ReduxStoreProviderDecorator = (storyFn:any) =>{
    return <Provider store={store}>{storyFn()}</Provider>
}