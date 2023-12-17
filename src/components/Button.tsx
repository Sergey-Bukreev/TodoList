import React from 'react';
import {FilterValuesType} from "../todolists/TodoLists";

 export type ButtonPropsType = {
    name: string
     callBack:() => void
     className?: string
}
export const Button:React.FC<ButtonPropsType> = (props) => {
let onClickHandler = () => {
    props.callBack()
}
    return (
        <button onClick={onClickHandler} className={props.className}>{props.name}</button>
    );
};

