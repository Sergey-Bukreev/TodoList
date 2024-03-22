import AppWithRedux from "./AppWithRedux";
import {
    ReduxStoreBrowserRouterDecorator,
    ReduxStoreProviderDecorator
} from "../../.storybook/ReduxStoreProviderDecorator";


export default {
   title:"AppWithRedux Component",
   component:AppWithRedux,
   decorators: [ReduxStoreProviderDecorator, ReduxStoreBrowserRouterDecorator]
}

export const AppWithReduxBaseExample = () => {
    return <AppWithRedux demo={true}/>
}