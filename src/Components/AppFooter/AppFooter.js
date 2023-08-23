import styles from "./AppFooter.module.css";

const AppFooter = ({ todos }) => {
  return (
    <div className={styles.footer}>
      <div>Create New List</div>
      <div>| {todos.length} items left</div>
    </div>
  );
};

export default AppFooter;
