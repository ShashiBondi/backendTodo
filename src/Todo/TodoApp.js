import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TodoApp.css";
import { useNavigate } from "react-router";
import auth from "../FirebaseConfig";
import TodoItem from "./TodoItem";
import logo from "../logo.png";

const todoApi = axios.create({
  baseURL: "http://44.202.55.191/api/users/",
});

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [radio, setRadio] = useState("All");
  const [editTodoId, setEditTodoId] = useState();
  const [userDetails, setUserDetails] = useState({});

  const navigate = useNavigate();

  const fetchTodos = async () => {
    try {
      const response = await todoApi.get(`${userDetails.id}/todos`);

      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const getCurrentUserDetails = () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const user = {
        name: currentUser.displayName,
        email: currentUser.email,
        id: currentUser.uid,
      };
      setUserDetails(user);
    } else {
      auth.signOut();
      navigate("/login");
    }
  };

  useEffect(() => {
    getCurrentUserDetails();
  }, []);

  useEffect(() => {
    if (userDetails.id) fetchTodos();
  }, [userDetails.id]);

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleRadio = (event) => {
    setRadio(event.target.value);
  };

  const createTodo = async () => {
    try {
      if (!newTodo.trim()) return;
      const response = await todoApi.post(`${userDetails.id}/todos`, {
        content: newTodo,
        completed: false,
      });
      const todoItem = response.data;
      const newTodos = todos.concat(todoItem);
      setTodos(newTodos);
    } catch (error) {
      console.log("error occurred while creating todo", error.message);
    }
    setNewTodo("");
  };

  const updateTodo = async () => {
    if (!newTodo.trim()) return;
    const targetTodo = todos.find((item) => item.id === editTodoId);
    try {
      await todoApi.put(`${userDetails.id}/todos/${editTodoId}`, {
        content: newTodo,
        completed: targetTodo.completed,
      });
      setNewTodo("");
      setEditTodoId();
      fetchTodos();
    } catch (error) {
      window.alert("Error occured while Updating the ToDoItem", error.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoApi.delete(`${userDetails.id}/todos/${id}`);
      const filteredTodos = todos.filter((item) => item.id !== id);
      setTodos(filteredTodos);
    } catch (error) {
      window.alert("error occurred while deleting the todo", error.message);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const targetTodoItem = todos.find((item) => item.id === id);

      await todoApi.put(`${userDetails.id}/todos/${id}`, {
        content: targetTodoItem.content,
        completed: !targetTodoItem.completed,
      });
      const toggledTodos = todos.map((item) => {
        if (item.id === id) {
          item.content = item.content;
          item.completed = !item.completed;
        }
        return item;
      });
      setTodos(toggledTodos);
    } catch (error) {
      window.alert("error occurred while toggling the item", error.message);
    }
  };

  const handleEditButtonClick = (id) => {
    const targetTodoItem = todos.find((item) => item.id === id);
    setNewTodo(targetTodoItem.content);
    setEditTodoId(id);
  };

  const handleLogoutButton = async () => {
    try {
      await auth.signOut();
      setUserDetails({});
      navigate("/");
    } catch (error) {
      window.alert("Error occurred while logging out", error.message);
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
        <TodoItem
          item={item}
          radio={radio}
          deleteTodo={deleteTodo}
          handleEditButtonClick={handleEditButtonClick}
          toggleComplete={toggleComplete}
        />
      );
    });

  return (
    <div className="todo-app">
      <div className="header">
        <img src={logo} alt="Logo" className="homepage-logo" />

        <h1>Welcome {userDetails.name}! Add Your Tasks</h1>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={handleInputChange}
          placeholder="New Task"
          className="todo-input"
        />
        <button
          className="add-button"
          onClick={editTodoId ? updateTodo : createTodo}
        >
          {editTodoId ? "Update Task" : "Add Task"}
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
      <div className="todos-container">{displayTodos}</div>{" "}
      <div className="button-container">
        <button className="button-btn" onClick={handleLogoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default TodoApp;
