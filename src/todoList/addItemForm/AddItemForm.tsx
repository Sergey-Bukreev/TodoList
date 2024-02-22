import React from 'react';
import { IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";
import {useAddItemForm} from "./hooks/useAddItemForm";


type AddItemFormPropsType = {
    addItem:(title: string, ) => void

}
export const AddItemForm:React.FC<AddItemFormPropsType> = React.memo((props:AddItemFormPropsType) => {
    const {newTaskTitle,
            error,
            onNewTitleChangeHandler,
            onKeyPressHandler,
            handleAddItem
         } = useAddItemForm(props.addItem)

    return (
        <div>
            <TextField value={newTaskTitle} onChange={onNewTitleChangeHandler} onKeyDown={onKeyPressHandler} error={!!error} variant={"outlined"} helperText={error} />
            <IconButton onClick={handleAddItem}  color={"primary"}>
                <ControlPoint/>
            </IconButton>
        </div>
    );
});

