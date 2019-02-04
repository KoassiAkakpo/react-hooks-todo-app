import React, { useContext, useState, useEffect } from "react";
import TodosContext from "../context";

export default function AddTodo() {
  const [todo, setTodo] = useState("");
  const {
    state: { currentTodo = {} },
    dispatch
  } = useContext(TodosContext);

  useEffect(
    () => {
      if (currentTodo.text) {
        setTodo(currentTodo.text);
      } else {
        setTodo("");
      }
    },
    [currentTodo.id]
  );

  const handleSubmit = e => {
    e.preventDefault();
    if (currentTodo.text) {
      dispatch({ type: "UPDATE_TODO", payload: todo });
    } else {
      dispatch({ type: "ADD_TODO", payload: todo });
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
