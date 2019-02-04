import React, { useContext, useState, useEffect } from "react";
import TodosContext from "../context";
import axios from "axios";
import { API_ENDPOINT } from "../config";

export default function AddTodo() {
  const [todo, setTodo] = useState("");
  const {
    state: { currentTodo = {} },
    dispatch
  } = useContext(TodosContext);

  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text);
    } else {
      setTodo("");
    }
  }, [currentTodo.id]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (todo.length === 0) return;
    if (currentTodo.text) {
      const response = await axios.patch(`${API_ENDPOINT}/${currentTodo.id}`, {
        text: todo
      });
      dispatch({ type: "UPDATE_TODO", payload: response.data });
    } else {
      const response = await axios.post(API_ENDPOINT, {
        text: todo,
        completed: false
      });
      dispatch({ type: "ADD_TODO", payload: response.data });
    }
    setTodo("");
  };

  return (
    <div>
      <React.Fragment>
        <form
          className="container mx-auto w-full max-w-md my-4"
          onSubmit={handleSubmit}
        >
          <input
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
            type="text"
            placeholder="Add todo ..."
            value={todo}
            onChange={e => setTodo(e.target.value)}
          />
        </form>
      </React.Fragment>
    </div>
  );
}
