import styles from "./RenderTodos.module.css";

const RenderTodos = ({ todos }) => {
  return (
    <ul className={styles.renderedTodos}>
      {todos.map((todo) => (
        <li className={styles.todo}>
          <input className={styles.todo__check} type="checkbox"></input>
          {todo}
        </li>
      ))}
    </ul>
  );
};

export default RenderTodos;
