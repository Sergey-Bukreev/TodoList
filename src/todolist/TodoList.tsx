import React, {useState} from 'react';

import {ToDoCard} from "./todocard/ToDoCard";

export type FilterValuesType = "all" | "active" | "completed"
let TodoCardData = [
    {
        id:1,
        title: "What to learn",
        filter:'completed',
        task:[
            {id:1, title:"HTML", isDone:true},
            {id:2, title:"JS/ES6", isDone:true},
            {id:3, title:"React", isDone:false}
        ],


    },
    {
        id:2,
        title: "What to by",
        filter: 'all',
        task:[
            {id:1, title:"Beer", isDone:false},
            {id:2, title:"Cheeps", isDone:true},
            {id:3, title:"Dry Fish", isDone:false}
        ],

    }
]



export const TodoList: React.FC = () => {
    let [tasks, setTasks] = useState(TodoCardData);
    let [filter, setFilter] = useState<FilterValuesType>("all")

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

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    };


    return (
            <>
                {tasks.map((el)=> {
                    const filteredTasks = el.task.filter((el) => {
                       if (filter === "active") {
                            return !el.isDone
                        } else if (filter === "completed") {
                            return  el.isDone
                        }

                       return true;
                    })

                    return <ToDoCard title={el.title}
                                     task={filteredTasks}
                                     id={el.id}
                                     key={el.id}
                                     removeTask={(tasks) => removeTask(el.id,tasks)}
                                     changeFilter={changeFilter}
                    />
                })}
            </>
    )
}






