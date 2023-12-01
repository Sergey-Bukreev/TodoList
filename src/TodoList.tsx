import React from 'react';

import {ToDoCard} from "./ToDoCard";
const TodoCardData = [
    {
        title: "What to learn",
        task:[
            {id:1, title:"HTML", isDone:true},
            {id:2, title:"JS/ES6", isDone:true},
            {id:3, title:"React", isDone:true}
        ],


    },
    {
        title: "What to by",
        task:[
            {id:1, title:"Bear", isDone:true},
            {id:2, title:"Cheeps", isDone:true},
            {id:3, title:"Dry Fish", isDone:true}
        ],

    }
]

 export const TodoList:React.FC = () => {
    return (
            <>
                {TodoCardData.map((el)=> <ToDoCard title={el.title} task={el.task} key={el.title} />)}
            </>
    )
};






