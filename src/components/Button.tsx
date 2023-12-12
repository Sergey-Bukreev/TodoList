import React from 'react';
import {FilterValuesType} from "../todolist/TodoList";

 export type ButtonPropsType = {
    name: string
     changeFilter?: (value:FilterValuesType) => void;
}
export const Button:React.FC<ButtonPropsType> = (props) => {

    return (
        <button>{props.name}</button>
    );
};

