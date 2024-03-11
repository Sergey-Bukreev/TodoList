import React from 'react';
import { IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";
import {useAddItemForm} from "../../hooks/useAddItemForm";


type AddItemFormPropsType = {
    addItem:(title: string, ) => void
    disabled?:boolean

}
export const AddItemForm:React.FC<AddItemFormPropsType> = React.memo(({addItem, disabled = false}:AddItemFormPropsType) => {
    const {newTaskTitle,
            error,
            onNewTitleChangeHandler,
            onKeyPressHandler,
            handleAddItem
         } = useAddItemForm(addItem)

    return (
        <div>
            <TextField value={newTaskTitle} onChange={onNewTitleChangeHandler} onKeyDown={onKeyPressHandler} error={!!error} variant={"outlined"} helperText={error}  disabled={disabled}/>
            <IconButton onClick={handleAddItem}  color={"primary"} disabled={disabled}>
                <ControlPoint/>
            </IconButton>
        </div>
    );
});

