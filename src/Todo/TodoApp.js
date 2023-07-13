import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 } from "uuid";
// Create an axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:9999/api/", // Replace with your backend base URL
});

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [radio, setRadio] = useState("All");

  const fetchTodos = async () => {
    try {
      const response = await api.get("todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };
  const handleRadio = (event) => {
    setRadio(event.target.value);
  };

  const createTodo = async () => {
    try {
      if (!newTodo.trim()) return;
      const response = await api.post("todos", {
        content: newTodo,
        completed: false,
      });
      const todoItem = response.data;
      const newTodos = todos.concat(todoItem);
      setTodos(newTodos);
    } catch (error) {
      console.log("error occured while creating todo", error);
    }
    setNewTodo("");
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`todos/${id}`);
      const filteredTodos = todos.filter((item) => {
        if (item.id !== id) return true;
      });
      setTodos(filteredTodos);
    } catch (error) {
      console.log("error occured while deleting the todo", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const targetTodoItem = todos.find((item) => {
        if (item.id === id) return true;
      });
      await api.put(`todos/${id}`, { completed: !targetTodoItem.completed });
      const toggledTodos = todos.map((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
        return item;
      });
      setTodos(toggledTodos);
    } catch (error) {
      console.log("error occured while toggling the item", error);
    }
  };
  const displayTodos = todos
    .filter((item) => {
      if (radio === "All") return true;
      else if (radio === "Completed") return item.completed;
      else return !item.completed;
    })
    .map((item) => {
      return (
        <div key={item.id}>
          <span
            style={{
              textDecoration: item.completed ? "line-through" : "none",
            }}
          >
            {item.content}
          </span>
          <button onClick={() => deleteTodo(item.id)}>Delete</button>
          <button>Update</button>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleComplete(item.id)}
          />
        </div>
      );
    });

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={handleInputChange}
        placeholder="New Todo"
      />
      <button onClick={createTodo}>Add Todo</button>
      <div>
        <span>
          <input
            type="radio"
            value="All"
            onChange={handleRadio}
            checked={radio === "All"}
          />
          All tasks
        </span>{" "}
        <span>
          <input
            type="radio"
            value="Completed"
            onChange={handleRadio}
            checked={radio === "Completed"}
          />
          Completed Tasks
        </span>{" "}
        <span>
          <input
            type="radio"
            value="Pending"
            onChange={handleRadio}
            checked={radio === "Pending"}
          />
          Pending Tasks
        </span>
      </div>

      {displayTodos}
    </div>
  );
};

export default TodoApp;
