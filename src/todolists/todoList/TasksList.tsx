import React from 'react';



export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

export type TaskListPropsType = {
    tasks: Array<TaskType>;
    removeTask: (id: string) => void;

};

 export const TasksList: React.FC<TaskListPropsType> = ({ tasks,removeTask }) => {
    return (
        <ul>
            {tasks.map((task:TaskType) => (
                <li key={task.id}>
                    <input type="checkbox" checked={task.isDone} />
                    <span>{task.title}</span>
                    <button onClick={()=> removeTask(task.id)}> x </button>
                </li>
            ))}
        </ul>
    );
};
