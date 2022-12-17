import React from "react";
import "./App.css";

import TodoItem from './TodoItem'
import FormTodo from './FormTodo'

const Todo = ({ accountAddress, todos, setTodos }) => {

    const addTodo = text => {
        const newTodos = [...todos, { text }];
        setTodos(newTodos);
    };

    return (
        <div className="container">
            <h1 className="text-center mb-4">Todo List</h1>
            <h6>{accountAddress}</h6>
            <FormTodo addTodo={addTodo} />
            {todos.length !== 0 ? (
                <div>
                    {todos.map((todo, index) => (
                        <TodoItem
                            key={index}
                            index={index}
                            todo={todo}
                        />
                    ))}
                </div>
            ) : <h1 className="text-center mb-4">No Todo Available</h1>
            }
        </div>)
}

export default Todo