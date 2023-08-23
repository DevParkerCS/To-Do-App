import styles from "./RenderTodos.module.css";
import axios from 'axios'

const apiDomain = "http://localhost:8000"


const RenderTodos = ({ todos, updateTodo }) => {
  const updateTodos = async (todo, isChecked) => {
    updateTodo(todo, isChecked);

    await axios.put(`${apiDomain}/todo/update`, { id: todo.id, isCompleted: isChecked }, { withCredentials: true });

  }
  return (
    <ul className={styles.renderedTodos}>
      {todos.map((todo, i) => (
        <li className={styles.todo} key={i}>
          <input onChange={(e) => { updateTodos(todo, e.target.checked) }} className={styles.todo__check} type="checkbox" checked={todo.isCompleted}></input>
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

export default RenderTodos;
