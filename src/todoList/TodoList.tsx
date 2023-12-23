import React, {ChangeEvent,  useState} from 'react';
import {FilterValuesType} from "../App";
import {Button} from "../components/Button";


type TodoListPropsType = {
    id:string
    title: string
    tasks: Array<TaskType>
    removeTodoList:(id:string)=>void
    removeTask: (taskId: string, todoId:string) => void
    changeFilter: (value: FilterValuesType, todoListId:string) => void
    addTask: (title: string, todoId:string) => void
    changeStatus:(taskId:string, isDone:boolean, todoId:string)=>void
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
            props.addTask(newTaskTitle.trim(), props.id);
            setNewTaskTitle('');
        } else {
            setError("Title is required")
        }
    };

    const removeTodoList = ()=> {props.removeTodoList(props.id)}
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {setNewTaskTitle(e.currentTarget.value)};
    const onKeyPressHandler =(e:React.KeyboardEvent<HTMLInputElement>)=> {
        setError(null)
        if(e.key === "Enter"){handleAddTask()}
    }
    const onAllClick = () => {props.changeFilter('all',props.id )};
    const onActiveClick = () => {props.changeFilter('active', props.id)};
    const onCompletedClick = () => {props.changeFilter('completed', props.id)};


    return (
        <div className="todoList">
            <h3>{props.title}<Button name={"x"} callBack={()=>removeTodoList()} /></h3>
            <div>
                <input value={newTaskTitle} onChange={onNewTitleChangeHandler} onKeyDown={onKeyPressHandler} className={error ? "error" : ""} />
                <Button name="+" callBack={handleAddTask} />
                {error && <div className={"error-message"}>{error}</div>}
                <ul>
                    {
                        props.tasks.map((task) => {
                            const onChangeStatusHandler= (e:ChangeEvent<HTMLInputElement>) =>{
                                props.changeStatus(task.id, e.currentTarget.checked, props.id)
                            }
                            return <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       checked={task.isDone}
                                        onChange={onChangeStatusHandler}/>
                                <span>{task.title}</span>
                                <Button name="x" callBack={() => props.removeTask(task.id, props.id)}/>
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