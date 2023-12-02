import React from 'react';

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
};

type TaskListPropsType = {
    tasks: Array<TaskType>;
};

 export const TasksList: React.FC<TaskListPropsType> = ({ tasks }) => {
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone} />
                    <span>{task.title}</span>
                </li>
            ))}
        </ul>
    );
};
