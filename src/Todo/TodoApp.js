import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 } from "uuid";
import "./TodoApp.css";

const api = axios.create({
  baseURL: "http://localhost:9999/api/",
});

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [radio, setRadio] = useState("All");
  const [editTodoId, setEditTodoId] = useState();

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
      console.log("error occurred while creating todo", error);
    }
    setNewTodo("");
  };

  const updateTodo = async () => {
    if (!newTodo.trim()) return;
    const targetTodo = todos.find((item) => item.id === editTodoId);
    await api.put(`todos/${editTodoId}`, {
      content: newTodo,
      completed: targetTodo.completed,
    });
    setNewTodo("");
    setEditTodoId();
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    try {
      await api.delete(`todos/${id}`);
      const filteredTodos = todos.filter((item) => item.id !== id);
      setTodos(filteredTodos);
    } catch (error) {
      console.log("error occurred while deleting the todo", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const targetTodoItem = todos.find((item) => item.id === id);

      await api.put(`todos/${id}`, { completed: !targetTodoItem.completed });
      const toggledTodos = todos.map((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
        return item;
      });
      setTodos(toggledTodos);
    } catch (error) {
      console.log("error occurred while toggling the item", error);
    }
  };

  const handleEditButtonClick = (id) => {
    const targetTodoItem = todos.find((item) => item.id === id);
    setNewTodo(targetTodoItem.content);
    setEditTodoId(id);
  };

  const displayTodos = todos
    .filter((item) => {
      if (radio === "All") return true;
      else if (radio === "Completed") return item.completed;
      else return !item.completed;
    })
    .map((item) => {
      return (
        <div key={item.id} className="todo-item">
          <span className={item.completed ? "completed" : ""}>
            {item.content}
          </span>
          <button className="delete-button" onClick={() => deleteTodo(item.id)}>
            Delete
          </button>
          <button
            className="update-button"
            onClick={() => {
              handleEditButtonClick(item.id);
            }}
          >
            Edit
          </button>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => toggleComplete(item.id)}
          />
        </div>
      );
    });

  return (
    <div className="todo-app">
      <h1>Add Your Todo's</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="New Todo"
          className="todo-input"
        />
        <button
          className="add-button"
          onClick={editTodoId ? updateTodo : createTodo}
        >
          {editTodoId ? "Update Todo" : "Add Todo"}
        </button>
      </div>
      <div className="filter-options">
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

      <div className="todos-container">{displayTodos}</div>
    </div>
  );
};

export default TodoApp;
