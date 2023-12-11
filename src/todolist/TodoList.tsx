import React, {useState} from 'react';

import {ToDoCard} from "./todocard/ToDoCard";
let TodoCardData = [
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



export const TodoList: React.FC = () => {
    let [tasks, setTasks] = useState(TodoCardData);

    const removeTask = (cardId: number, taskId: number) => {
        const updatedTasks = tasks.map((el) => {
            if(cardId === el.id) {

                const updatedTask = el.task.filter((task) => task.id !== taskId);
                return { ...el, task: updatedTask };
            }
            return el

        });

        setTasks(updatedTasks);
    }

    return (
            <>
                {tasks.map((el)=> <ToDoCard title={el.title}
                                                                            task={el.task}
                                                                            id={el.id}
                                                                            key={el.id}
                                                                            removeTask={(tasks) => removeTask(el.id,tasks)}/>)}
            </>
    )
};






