import NewTaskForm from "./NewTaskForm";
import Todos from "./Todos";
import AppFooter from "./AppFooter";
import styles from './Home.module.css'
import { useEffect, useState } from "react";
import { APIFetcher } from "../../utils/APIFetcher";
import { WarningModal } from "../../components/modals/WarningModal";

export const Home = () => {
    const [todos, setTodos] = useState(null);
    const [renderRule, setRenderRule] = useState('all')
    const [validInput, setValidInput] = useState(true)
    const [showWarning, setShowWarning] = useState(false)
    
    const fetchTodos = async () => {
        APIFetcher.getTodos(renderRule).then(
            setTodos
        ).catch((err) => {
            console.log(err)
        })
    }

    const updateTodos =  (todo, isChecked) => {
        setTodos(APIFetcher.updateTodo(todo, isChecked, todos))
    }

    const createNewTodo = async (title) => {
        APIFetcher.createTodo(title, todos).then(
            setTodos
        ).catch(err => console.log(err))
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    if (!todos) {
        return <h1>Loading</h1>
    }

    return (
        <div className={`${styles.appWrapper} ${validInput ? '' : styles.invalidInput}`}>
            <h1>Your First ToDo List</h1>
            <NewTaskForm todos={todos} isInputValid={setValidInput} createTodo={createNewTodo} />
            <Todos getTodos={fetchTodos} renderRule={renderRule} todos={todos} updateTodo={updateTodos} />
            <AppFooter setRenderRule={setRenderRule} todos={todos} />
            <WarningModal
             title={'Warning'} 
             text={'Are You Sure You Want To Delete This Todo?'} 
             btnText1={'Cancel'}
             btnText2={'Delete'}/>
        </div>
    )
}