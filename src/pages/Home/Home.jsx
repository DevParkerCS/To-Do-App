import Form from "../../Components/Form/Form";
import RenderTodos from "../../Components/RenderTodos/RenderTodos";
import AppFooter from "../../Components/AppFooter/AppFooter";
import styles from './Home.module.css'
import { useEffect, useState } from "react";
import axios from "axios";

const apiDomain = "http://localhost:8000"

export const Home = () => {
    const [todos, setTodos] = useState(null);
    const [apiError, setApiError] = useState(null);
    const [isCreatingTask, setIsCreatingTask] = useState(false);

    useEffect(() => {
        getTodos();
    }, [])

    const createTodo = async (title) => {
        setIsCreatingTask(true);
        try {
            const { data: { newTodo } } = await axios.post(`${apiDomain}/todo/create`, { title }, { withCredentials: true })

            setTodos([...todos, newTodo])
            setIsCreatingTask(false);
        } catch (err) {
            console.log({ err });
            setApiError(err.response.data.msg);
            setIsCreatingTask(false);
        }
    }

    const getTodos = async () => {
        try {
            const { data } = await axios.get(`${apiDomain}/todo/all`, { withCredentials: true })

            setTodos(data.todos)
        } catch (err) {
            console.log({ err });
        }
    }

    const updateTodo = (todo, isChecked) => {
        const newTodos = todos.map(t => {
            if (t.id === todo.id) {
                return {
                    ...todo,
                    isCompleted: isChecked,
                }
            } else {
                return t
            }
        })

        setTodos(newTodos);
    }

    if (!todos) {
        return <h1>Loading</h1>
    }

    return (
        <div className={styles.appWrapper}>
            {apiError && (
                <p>{apiError}</p>
            )}
            <h1>THINGS TO DO</h1>
            <Form createTodo={createTodo} />
            <RenderTodos todos={todos} updateTodo={updateTodo} />
            <AppFooter todos={todos} />
            <button onClick={() => createTodo("Task 2")} disabled={isCreatingTask}>{isCreatingTask ? "Loading" : "Create"}</button>
        </div>
    )
}