import axios from "axios";
const apiDomain = "http://localhost:8000";

export class APIFetcher {
  static createTodo = async (title, todos) => {
    try {
      const {
        data: { newTodo },
      } = await axios.post(
        `${apiDomain}/todo/create`,
        { title },
        { withCredentials: true }
      );

      return [...todos, newTodo];
    } catch (err) {
      console.log({ err });
    }
  };

  static getTodos = async (renderRule) => {
    const { data } = await axios.get(`${apiDomain}/todo/all`, {
      withCredentials: true,
    });

    return data.todos;
  };

  static updateTodo = (todo, isChecked, todos) => {
    const newTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...todo,
          isCompleted: isChecked,
        };
      } else {
        return t;
      }
    });
    return newTodos;
  };
}
