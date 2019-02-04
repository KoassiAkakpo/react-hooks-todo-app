import React from "react";

const TodosContext = React.createContext({
  todos: [
    { id: 1, text: "Take breakfast", completed: false },
    { id: 2, text: "Make a journey", completed: false },
    { id: 3, text: "Finish react learning", completed: true }
  ],
  currentTodo: {}
});

export default TodosContext;
