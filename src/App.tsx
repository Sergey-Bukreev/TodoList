import React from 'react';
import './App.css';
import { TodoList} from "./todolist/TodoList";
import {TodoCardPropsType} from "./todolist/todocard/ToDoCard";


const App = () => {

    return (
        <div className="App">
            <TodoList />
        </div>
    );
}

export default App;
