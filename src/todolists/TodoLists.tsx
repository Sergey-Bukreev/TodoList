    import React, { useState } from 'react';
    import { ToDoList } from './todoList/ToDoList';
    import {v1} from "uuid";

    export type FilterValuesType = 'all' | 'active' | 'completed';

    let InitialTodoListData = [
        {
            id: v1(),
            title: 'What to learn',
            filter: 'all',
            taskList: [
                { id: v1(), title: 'HTML', isDone: true },
                { id: v1(), title: 'JS/ES6', isDone: true },
                { id: v1(), title: 'React', isDone: false },
            ],
        },
        {
            id: v1(),
            title: 'What to buy',
            filter: 'all',
            taskList: [
                { id: v1(), title: 'Beer', isDone: false },
                { id: v1(), title: 'Chips', isDone: true },
                { id: v1(), title: 'Dry Fish', isDone: false },
            ],
        },
    ];

    export const TodoLists: React.FC = () => {
        let [tasks, setTasks] = useState(InitialTodoListData);
        let [filter, setFilter] = useState<FilterValuesType>('all');

        let removeTask = (todoListId: string, taskId: string) => {
            const updatedTasks = tasks.map((el) => {
                if (todoListId === el.id) {
                    const updatedTask = el.taskList.filter((task) => task.id !== taskId);
                    return { ...el, taskList: updatedTask };
                }
                return el;
            });

            setTasks(updatedTasks);
        };

        let changeFilter = (value: FilterValuesType, todoListId: string) => {
            setFilter(value);

            const updatedTasks = tasks.map((el) => {
                if (todoListId === el.id) {
                    return { ...el, filter: value };
                }
                return el;
            });

            setTasks(updatedTasks);
        };

        let addTask = (title:string, todoListId:string ) => {
            let newTask = {id: v1(), title: title, isDone:false}
            let newTasks= tasks.map((el)=> {
                if(todoListId === el.id) {
                    return {...el, taskList: [newTask, ...el.taskList]}
                }
                return el
            })
            setTasks(newTasks)
        }

        let changeStatus =(todoListId:string, isDone:boolean, taskId:string) => {
            let updateStatusTodo = tasks.map((el)=> {
                if(todoListId === el.id) {
                    let updateStatusTaskList = el.taskList.map((el)=>{
                        if(taskId===el.id){
                          return   {...el, isDone:isDone}
                        }
                        return el
                    })
                    return {...el, taskList:updateStatusTaskList}
                }
                return el
            })
            setTasks(updateStatusTodo)
        }

        return (
            <>
                {tasks.map((el) => {
                    const filteredTasks = el.taskList.filter((task) => {
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
                            changeFilter={(value:FilterValuesType) => changeFilter(value, el.id)}
                            addTask={(title:string) => addTask(title, el.id)}
                            changeStatus={(isDone: boolean, taskId: string) => changeStatus(el.id, isDone, taskId)}
                        />
                    );
                })}
            </>
        );
    };
