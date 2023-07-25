import React from "react";

function TodoItem(props) {
  const { item, handleEditButtonClick, deleteTodo, toggleComplete, radio } =
    props;
  return (
    <div key={item.id} className="todo-item">
      <div className="box-1">
        {" "}
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => toggleComplete(item.id)}
        />
        <span className={item.completed && radio === "All" ? "completed" : ""}>
          {item.content}
        </span>
      </div>
      <div className="box-2">
        {" "}
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
      </div>
    </div>
  );
}

export default TodoItem;
