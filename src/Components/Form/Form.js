import { useState } from "react";
import styles from "./Form.module.css";

const Form = ({ createTodo }) => {
  const [inputValue, setInputValue] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(e.target);
    if (e.target[0].value !== "") {
      setInputValue("");
      createTodo(e.target[0].value)
    }
  };

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form className={styles.form} onSubmit={formSubmitHandler}>
      <input
        className={styles.form__input}
        value={inputValue}
        onChange={inputChangeHandler}
        placeholder="Add New"
      ></input>
    </form>
  );
};

export default Form;
