import React from 'react';
import './App.css';
import { TodoLists} from "./todolists/TodoLists";
import {TodoCardPropsType} from "./todolists/todoList/ToDoList";


const App = () => {

    return (
        <div className="App">
            <TodoLists />
        </div>
    );
}

export default App;
