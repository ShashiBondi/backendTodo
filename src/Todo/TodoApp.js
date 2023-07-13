import React, { useState, useEffect } from "react";
import axios from "axios";

// Create an axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:9999/api/", // Replace with your backend base URL
});

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await api.get("todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const createTodo = async () => {
    if (newTodo.trim() === "") {
      return;
    }

    try {
      const response = await api.post("todos", { content: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`todos/${id}`);
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todo = todos.find((todo) => todo.id === id);
      const updatedTodo = { ...todo, completed: !todo.completed };
      await api.put(`todos/${id}`, updatedTodo);
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? updatedTodo : todo
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New Todo"
      />
      <button onClick={createTodo}>Add Todo</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.content}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
