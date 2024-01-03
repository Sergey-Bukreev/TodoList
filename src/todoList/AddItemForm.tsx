import React, {ChangeEvent, useState} from 'react';
import {Button} from "../components/Button";

type AddItemFormPropsType = {
    addItem:(title: string, ) => void

}
export const AddItemForm = (props:AddItemFormPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {setNewTaskTitle(e.currentTarget.value)};
    const onKeyPressHandler =(e:React.KeyboardEvent<HTMLInputElement>)=> {
        setError(null)
        if(e.key === "Enter"){handleAddTask()}
    }
    const handleAddTask = () => {

        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle.trim(), );
            setNewTaskTitle('');
        } else {
            setError("Title is required")
        }
    };

    return (
        <div>
            <input value={newTaskTitle} onChange={onNewTitleChangeHandler} onKeyDown={onKeyPressHandler} className={error ? "error" : ""} />
            <Button name="+" callBack={handleAddTask} />
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    );
};

