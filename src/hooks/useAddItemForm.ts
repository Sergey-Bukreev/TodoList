import React, {ChangeEvent, useState} from "react";

export const useAddItemForm = (onItemAdded:(title: string, ) => void)=> {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {setNewTaskTitle(e.currentTarget.value)};
    const onKeyPressHandler =(e:React.KeyboardEvent<HTMLInputElement>)=> {
        if(error !== null) {setError(null)}
        if(e.key === "Enter"){handleAddItem()}
    }
    const handleAddItem = () => {

        if (newTaskTitle.trim() !== "") {
            onItemAdded(newTaskTitle.trim(), );
            setNewTaskTitle('');
        } else {
            setError("Title is required")
        }
    };
    return {newTaskTitle, error, onNewTitleChangeHandler,onKeyPressHandler, handleAddItem}
}