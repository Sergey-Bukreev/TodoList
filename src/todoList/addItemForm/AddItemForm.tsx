import React, {ChangeEvent, useState} from 'react';
import { IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";


type AddItemFormPropsType = {
    addItem:(title: string, ) => void

}
export const AddItemForm:React.FC<AddItemFormPropsType> = React.memo((props:AddItemFormPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {setNewTaskTitle(e.currentTarget.value)};
    const onKeyPressHandler =(e:React.KeyboardEvent<HTMLInputElement>)=> {
       if(error !== null) {setError(null)}
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
            <TextField value={newTaskTitle} onChange={onNewTitleChangeHandler} onKeyDown={onKeyPressHandler} error={!!error} variant={"outlined"} helperText={error} />
            <IconButton onClick={handleAddTask}  color={"primary"}>
                <ControlPoint/>
            </IconButton>
        </div>
    );
});

