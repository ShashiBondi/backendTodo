import React from "react";

import deleteIcon from "../delete.png";
import editIcon from "../edit.png";

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
        <span className="delete-button" onClick={() => deleteTodo(item.id)}>
          <img src={deleteIcon} alt="Delete" width="24" height="24" />
        </span>
        <span
          className="update-button"
          onClick={() => {
            handleEditButtonClick(item.id);
          }}
        >
          <img src={editIcon} alt="Edit" width="24" height="24" />
        </span>
      </div>
    </div>
  );
}

export default TodoItem;
