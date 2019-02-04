export default function reducer(state, action) {
  switch (action.type) {
    case "GET_TODOS":
      return {
        ...state,
        todos: action.payload
      };
    case "ADD_TODO":
      const newTodos = [...state.todos, action.payload];
      return {
        ...state,
        todos: newTodos
      };
    case "SET_CURRENT_TODO":
      return {
        ...state,
        currentTodo: action.payload
      };
    case "UPDATE_TODO":
      // if (!action.payload) return state;
      // if (state.todos.findIndex(t => t.text === action.payload) > -1) {
      //   return {
      //     ...state,
      //     currentTodo: {}
      //   };
      // }
      const updatedTodo = { ...action.payload };
      const updatedTodoIndex = state.todos.findIndex(
        t => t.id === state.currentTodo.id
      );
      const updatedTodos = [...state.todos];
      updatedTodos[updatedTodoIndex] = updatedTodo;
      return {
        ...state,
        currentTodo: {},
        todos: updatedTodos
      };

    case "TOGGLE_TODO":
      const toggledTodos = state.todos.map(t =>
        t.id === action.payload.id ? action.payload : t
      );
      return {
        ...state,
        todos: toggledTodos
      };
    case "DELETE_TODO":
      const filteredTodo = state.todos.filter(t => t.id !== action.payload.id);
      const isRemovedTodo =
        state.currentTodo.id === action.payload.id ? {} : state.currentTodo;
      return {
        ...state,
        currentTodo: isRemovedTodo,
        todos: filteredTodo
      };

    default:
      return state;
  }
}
