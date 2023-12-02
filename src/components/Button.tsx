import React from 'react';

 export type ButtonPropsType = {
    name: string
}
export const Button:React.FC<ButtonPropsType> = (props) => {

    return (
        <button>{props.name}</button>
    );
};

