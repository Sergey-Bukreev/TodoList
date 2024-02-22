import AppWithRedux from "./AppWithRedux/AppWithRedux";
import {ReduxStoreProviderDecorator} from "../.storybook/ReduxStoreProviderDecorator";

export default {
   title:"AppWithRedux Component",
   component:AppWithRedux,
   decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = () => {
    return <AppWithRedux />
}