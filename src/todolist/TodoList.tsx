import React from 'react';

import {ToDoCard} from "./todocard/ToDoCard";
const TodoCardData = [
    {
        id:1,
        title: "What to learn",
        task:[
            {id:1, title:"HTML", isDone:true},
            {id:2, title:"JS/ES6", isDone:true},
            {id:3, title:"React", isDone:false}
        ],


    },
    {
        id:2,
        title: "What to by",
        task:[
            {id:1, title:"Bear", isDone:false},
            {id:2, title:"Cheeps", isDone:true},
            {id:3, title:"Dry Fish", isDone:false}
        ],

    }
]

 export const TodoList:React.FC = () => {
    return (
            <>
                {TodoCardData.map((el)=> <ToDoCard title={el.title} tasks={el.task} key={el.id} />)}
            </>
    )
};






