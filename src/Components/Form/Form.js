import { useState } from "react";
import styles from "./Form.module.css";

const Form = ({ setTodos }) => {
  const [inputValue, setInputValue] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (e.target[0].value !== "") {
      setTodos((prevState) => {
        setInputValue("");
        return [...prevState, e.target[0].value];
      });
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
