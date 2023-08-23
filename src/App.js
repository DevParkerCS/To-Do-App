import Form from "./Components/Form/Form";
import RenderTodos from "./Components/RenderTodos/RenderTodos";
import AppFooter from "./Components/AppFooter/AppFooter";
import styles from "./App.module.css";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState(["Learn Javascript", "Learn React"]);
  return (
    <div className={styles.appWrapper}>
      <h1>THINGS TO DO</h1>
      <Form setTodos={setTodos}></Form>
      <RenderTodos todos={todos}></RenderTodos>
      <AppFooter todos={todos}></AppFooter>
    </div>
  );
}

export default App;
