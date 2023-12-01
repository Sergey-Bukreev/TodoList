import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

function App() {
    const todoListTitle_1:string = "What to learn"
    const todoListTitle_2:string = "What to by"
    const task_1:Array<TaskType> = [
        {id:1, title:"HTML", isDone:true},
        {id:2, title:"JS/ES6", isDone:true},
        {id:3, title:"React", isDone:true}

    ]
    const task_2:Array<TaskType> = [
        {id:1, title:"Bear", isDone:true},
        {id:2, title:"Cheeps", isDone:true},
        {id:3, title:"Dry Fish", isDone:true}

    ]
    return (
        <div className="App">
            <TodoList title={todoListTitle_1} task={task_1}/>
            <TodoList title={todoListTitle_2} task={task_2}/>

        </div>
    );
}

export default App;
