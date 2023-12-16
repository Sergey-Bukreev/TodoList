import React, { useState } from 'react';
import { ToDoList } from './todoList/ToDoList';
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed';

let InitialTodoListData = [
    {
        id: v1(),
        title: 'What to learn',
        filter: 'all',
        tasks: [
            { id: v1(), title: 'HTML', isDone: true },
            { id: v1(), title: 'JS/ES6', isDone: true },
            { id: v1(), title: 'React', isDone: false },
        ],
    },
    {
        id: v1(),
        title: 'What to buy',
        filter: 'all',
        tasks: [
            { id: v1(), title: 'Beer', isDone: false },
            { id: v1(), title: 'Chips', isDone: true },
            { id: v1(), title: 'Dry Fish', isDone: false },
        ],
    },
];

export const TodoLists: React.FC = () => {
    let [tasks, setTasks] = useState(InitialTodoListData);
    let [filter, setFilter] = useState<FilterValuesType>('all');
                                        ///------- delete Task------ ////
    let removeTask = (cardId: string, taskId: string) => {
        const updatedTasks = tasks.map((el) => {
            if (cardId === el.id) {
                const updatedTask = el.tasks.filter((task) => task.id !== taskId);
                return { ...el, tasks: updatedTask };
            }
            return el;
        });

        setTasks(updatedTasks);
    };
                                        /////----- Filter Tasks-------////
    let changeFilter = (value: FilterValuesType, cardId: string) => {
        setFilter(value);

        const updatedTasks = tasks.map((el) => {
            if (cardId === el.id) {
                return { ...el, filter: value };
            }
            return el;
        });

        setTasks(updatedTasks);
    };
                                        ///// ------ ADD Task ------/////
    let addTask = (title:string,cardId:string ) => {
        let newTask = {id: v1(), title: title, isDone:false}
        let newTasks= tasks.map((el)=> {
            if(cardId === el.id) {
                return {...el, tasks: [newTask, ...el.tasks]}
            }
            return el
        })
        setTasks(newTasks)
    }

    return (
        <>
            {tasks.map((el) => {
                const filteredTasks = el.tasks.filter((task) => {
                    if (el.filter === 'active' && !task.isDone) {
                        return true;
                    } else if (el.filter === 'completed' && task.isDone) {
                        return true;
                    } else if (el.filter === 'all') {
                        return true;
                    }

                    return false;
                });

                return (
                    <ToDoList
                        title={el.title}
                        task={filteredTasks}
                        id={el.id}
                        key={el.id}
                        removeTask={(taskId:string) => removeTask(el.id, taskId)}
                        changeFilter={(value) => changeFilter(value, el.id)}
                        addTask={(title) => addTask(title, el.id)}
                    />
                );
            })}
        </>
    );
};
