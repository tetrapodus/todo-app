import { useEffect, useState } from "react";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [filterUser, setFilterUser] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  // fetch todos
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);

  // complete todo
  function handleComplete(id) {
    const updated = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: true,
        };
      }
      return todo;
    });

    setTodos(updated);
  }

  // uncomplete todo
  function handleUncomplete(id) {
    const updated = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: false,
        };
      }
      return todo;
    });

    setTodos(updated);
  }

  // filter todos
  let filteredTodos = todos;
  if (filterUser !== "all") {
    filteredTodos = todos.filter(
      (t) => t.userId === Number(filterUser)
    );
  }

  // split lists
  let uncompleted = filteredTodos.filter((t) => !t.completed);
  let completed = filteredTodos.filter((t) => t.completed);

  // sort uncompleted by title
  uncompleted.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });

  return (
    <div className="container">
      <h1 className="app-title">Todo App</h1>

      {/* FILTER */}
      <div>
        <label>Filter by user: </label>
        <select
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
        >
          <option value="all">All</option>
          <option value="1">User 1</option>
          <option value="2">User 2</option>
          <option value="3">User 3</option>
          <option value="4">User 4</option>
          <option value="5">User 5</option>
          <option value="6">User 6</option>
          <option value="7">User 7</option>
          <option value="8">User 8</option>
          <option value="9">User 9</option>
          <option value="10">User 10</option>
        </select>
      </div>

      <div className="layout">
        {/* LEFT SIDE */}
        <div className="card">
          <h2>Uncompleted</h2>

          <div>
            <label>Sort: </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          {uncompleted.map((todo) => (
            <div key={todo.id} className="todo-item">
              <span>{todo.title}</span>
              <button
                className="complete"
                onClick={() => handleComplete(todo.id)}
              >
                Complete
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="card">
          <h2>Completed</h2>

          {completed.map((todo) => (
            <div key={todo.id} className="todo-item">
              <span className="completed">{todo.title}</span>
              <button
                className="uncomplete"
                onClick={() => handleUncomplete(todo.id)}
              >
                Undo
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}