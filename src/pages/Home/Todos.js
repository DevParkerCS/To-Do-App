import styles from "./Todos.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";

const apiDomain = "http://localhost:8000";

const Todos = ({ todos, updateTodo, renderRule, getTodos }) => {
  if (todos.length === 0) {
    return <div>Looks Like Theres No Tasks Yet...</div>;
  }

  return (
    <ul className={styles.renderedTodos}>
      {todos.map((todo, i) => {
        const renderTodo =
          (renderRule === "completed" && todo.isCompleted) ||
          (renderRule === "active" && !todo.isCompleted) ||
          renderRule === "all";

        return (
          renderTodo && (
            <TodoListItem
              getTodos={getTodos}
              updateTodo={updateTodo}
              todo={todo}
              todos={todos}
              i={i}
              key={todo._id}
            />
          )
        );
      })}
    </ul>
  );
};

const TodoListItem = ({ todo, i, updateTodo, getTodos, todos }) => {
  const [isEditiing, setIsEditing] = useState(false);
  const todoTitle = useRef(null);

  useEffect(() => {
    if (isEditiing) {
      todoTitle.current?.focus();
    }
  }, [isEditiing]);

  const updateTodos = async (todo, isChecked) => {
    updateTodo(todo, isChecked, todos);

    await axios.put(
      `${apiDomain}/todo/update`,
      { id: todo.id, isCompleted: isChecked },
      { withCredentials: true }
    );
  };

  const todoClickHandler = async (todo) => {
    await axios.delete(`${apiDomain}/todo/delete/${todo.id}`, {
      withCredentials: true,
    });
    getTodos();
  };

  const handleEditBtnClick = () => {
    setIsEditing(!isEditiing);
  };

  return (
    <li className={styles.todo} key={i}>
      <input
        onChange={(e) => {
          updateTodos(todo, e.target.checked, todos);
        }}
        className={styles.todo__check}
        type="checkbox"
        checked={todo.isCompleted}
      ></input>
      <p
        contentEditable={isEditiing}
        ref={todoTitle}
        className={`${styles.todo__title} ${isEditiing ? styles.focused : ""}`}
      >
        {todo.title}
      </p>
      <FontAwesomeIcon
        onClick={handleEditBtnClick}
        className={`${styles.icon} ${styles.editBtn}`}
        icon={!isEditiing ? faPenToSquare : faSave}
      />
      <FontAwesomeIcon
        className={styles.icon}
        onClick={() => todoClickHandler(todo)}
        icon={faTrash}
      />
    </li>
  );
};

export default Todos;
