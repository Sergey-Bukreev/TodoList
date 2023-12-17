import React, {ChangeEvent} from 'react';



export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

export type TaskListPropsType = {
    tasks: Array<TaskType>;
    removeTask: (id: string) => void;
    changeStatus: (isDone: boolean, taskId: string)=> void

};

 export const TasksList: React.FC<TaskListPropsType> = ({ tasks,removeTask, changeStatus }) => {
     let  onChangeStatusHandler=(task:TaskType)=> {
         changeStatus(!task.isDone, task.id);
     }
    return (
        <ul>
            {tasks.map((task:TaskType) => (
                <li key={task.id} className={task.isDone? "is-done" : ""}>
                    <input type="checkbox"
                           checked={task.isDone}
                            onChange={()=>onChangeStatusHandler(task)}/>
                    <span>{task.title}</span>
                    <button onClick={()=> removeTask(task.id)}> x </button>
                </li>
            ))}
        </ul>
    );
};
