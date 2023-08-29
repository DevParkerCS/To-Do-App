import Form from "./NewTaskForm";
import RenderTodos from "./Todos";
import AppFooter from "./AppFooter";
import styles from './Home.module.css'
import { useEffect, useState } from "react";
import axios from "axios";

const apiDomain = "http://localhost:8000"

export const Home = () => {
    const [todos, setTodos] = useState(null);
    const [renderRule, setRenderRule] = useState('all')
    const [apiError, setApiError] = useState(null);
    const [isCreatingTask, setIsCreatingTask] = useState(false);
    const [validInput, setValidInput] = useState(true)

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
            const todos = []
            if (renderRule === 'completed') {
                for (let dataPoint of data) {
                    if (dataPoint.isCompleted) {
                        todos.push(dataPoint)
                    }
                }
            } else if (renderRule === 'active') {
                for (let dataPoint of data) {
                    if (!dataPoint.isCompleted) {
                        todos.push(dataPoint)
                    }
                }
            } else {
                setTodos(data)
                return
            }
            setTodos(todos)
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
        setTodos(newTodos)
    }

    if (!todos) {
        return <h1>Loading</h1>
    }

    return (
        <div className={`${styles.appWrapper} ${validInput ? '' : styles.invalidInput}`}>
            {apiError && (
                <p>{apiError}</p>
            )}
            <h1>THINGS TO DO</h1>
            <Form isInputValid={setValidInput} createTodo={createTodo} />
            <RenderTodos getTodos={getTodos} renderRule={renderRule} todos={todos} updateTodo={updateTodo} />
            <AppFooter setRenderRule={setRenderRule} todos={todos} />
        </div>

    )
}