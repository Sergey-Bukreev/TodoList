import React, { useState } from 'react';
import { ToDoCard } from './todocard/ToDoCard';

export type FilterValuesType = 'all' | 'active' | 'completed';

let TodoCardData = [
    {
        id: 1,
        title: 'What to learn',
        filter: 'all',
        todoList: [
            { id: 1, title: 'HTML', isDone: true },
            { id: 2, title: 'JS/ES6', isDone: true },
            { id: 3, title: 'React', isDone: false },
        ],
    },
    {
        id: 2,
        title: 'What to buy',
        filter: 'all',
        todoList: [
            { id: 1, title: 'Beer', isDone: false },
            { id: 2, title: 'Chips', isDone: true },
            { id: 3, title: 'Dry Fish', isDone: false },
        ],
    },
];

export const TodoList: React.FC = () => {
    let [tasks, setTasks] = useState(TodoCardData);
    let [filter, setFilter] = useState<FilterValuesType>('all');

    const removeTask = (cardId: number, taskId: number) => {
        const updatedTasks = tasks.map((el) => {
            if (cardId === el.id) {
                const updatedTask = el.todoList.filter((task) => task.id !== taskId);
                return { ...el, todoList: updatedTask };
            }
            return el;
        });

        setTasks(updatedTasks);
    };

    const changeFilter = (value: FilterValuesType, cardId: number) => {
        setFilter(value);

        const updatedTasks = tasks.map((el) => {
            if (cardId === el.id) {
                return { ...el, filter: value };
            }
            return el;
        });

        setTasks(updatedTasks);
    };

    return (
        <>
            {tasks.map((el) => {
                const filteredTasks = el.todoList.filter((task) => {
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
                    <ToDoCard
                        title={el.title}
                        task={filteredTasks}
                        id={el.id}
                        key={el.id}
                        removeTask={(taskId) => removeTask(el.id, taskId)}
                        changeFilter={(value) => changeFilter(value, el.id)}
                    />
                );
            })}
        </>
    );
};
