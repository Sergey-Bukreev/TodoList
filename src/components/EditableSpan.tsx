import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title:string
    onChange:(newValue:string)=> void
    }
export const EditableSpan:React.FC<EditableSpanPropsType> = React.memo( (props:EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false )
    const [title, setTitle] = useState("")
    const activateEditMode = ()=> {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    };
    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}

    return ( editMode
        ? <TextField value={title} onBlur={activateViewMode} autoFocus onChange={onChangeTitleHandler}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
    );
});

