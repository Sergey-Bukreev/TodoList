import React, {ChangeEvent,  useState} from 'react';
import {FilterValuesType} from "../App";
import {Button} from "../components/Button";


type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus:(taskId:string, isDone:boolean)=>void
    filter:FilterValuesType

}
type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoList: React.FC<TodoListPropsType> = (props) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleAddTask = () => {

        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError("Title is required")
        }
    };

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {setNewTaskTitle(e.currentTarget.value)};
    const onKeyPressHandler =(e:React.KeyboardEvent<HTMLInputElement>)=> {
        setError(null)
        if(e.key === "Enter"){handleAddTask()}
    }
    const onAllClick = () => {props.changeFilter('all')};
    const onActiveClick = () => {props.changeFilter('active')};
    const onCompletedClick = () => {props.changeFilter('completed')};


    return (
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle} onChange={onNewTitleChangeHandler} onKeyDown={onKeyPressHandler} className={error ? "error" : ""} />
                <Button name="+" callBack={handleAddTask} />
                {error && <div className={"error-message"}>{error}</div>}
                <ul>
                    {
                        props.tasks.map((task) => {
                            const onChangeStatusHandler= (e:ChangeEvent<HTMLInputElement>) =>{
                                props.changeStatus(task.id, e.currentTarget.checked)
                            }
                            return <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                        onChange={onChangeStatusHandler}/>
                                <span>{task.title}</span>
                                <Button name="x" callBack={() => props.removeTask(task.id)}/>
                            </li>
                        })
                    }
                </ul>
                <div>
                    <Button name="ALL" callBack={onAllClick} className={props.filter === "all" ? "active-filter" : ""}  />
                    <Button name="Active" callBack={onActiveClick} className={props.filter === "active" ? "active-filter" : ""}/>
                    <Button name="Completed" callBack={onCompletedClick} className={props.filter === "completed" ? "active-filter" : ""}/>
                </div>
            </div>
        </div>
    );
};