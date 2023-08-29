import { useState } from "react";
import styles from "./NewTaskForm.module.css";

const NewTaskForm = ({ createTodo, isInputValid }) => {
  const [inputValue, setInputValue] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    if (e.target[0].value !== "") {
      setInputValue("");
      createTodo(e.target[0].value)
    } else {
      isInputValid(false)
    }
  };

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
    isInputValid(true)
  };

  return (
    <form className={styles.form} onSubmit={formSubmitHandler}>
      <input
        className={`${styles.form__input}`}
        value={inputValue}
        onChange={inputChangeHandler}
        placeholder="Add New"
      ></input>
    </form>
  );
};

export default NewTaskForm;
