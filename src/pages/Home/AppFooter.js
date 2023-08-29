import styles from "./AppFooter.module.css";

const AppFooter = ({ todos, setRenderRule }) => {
  const setRuleCompleted = () => {
    setRenderRule('completed')
  }

  const setRuleActive = () => {
    setRenderRule('active')
  }

  const passAllTodos = () => {
    setRenderRule('all')
  }

  const getActiveCount = () => {
    let activeCount = 0
    for (let todo of todos) {
      if (!todo.isCompleted) {
        activeCount += 1
      }
    }
    return activeCount
  }

  return (
    <div className={styles.footer}>
      <div>Create New List</div>
      <div>| {getActiveCount()} items left</div>
      <button onClick={passAllTodos}>All</button>
      <button onClick={setRuleActive}>Active</button>
      <button onClick={setRuleCompleted}>Completed</button>
    </div>
  );
};

export default AppFooter;
