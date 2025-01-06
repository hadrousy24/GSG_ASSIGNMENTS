import React, { useState } from 'react'
import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import Form from './components/Form/Form'
import TodoList from './components/TodoList/TodoList'
import { ITodoItem } from './components/types'

function App() {
  const [todos, setTodos] = useState<ITodoItem[]>([]);

  const handleNewItem = (newTask: ITodoItem) => {
    setTodos([...todos, newTask]);
  }

  const handleTaskToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const itemId = e.target.dataset.itemId;
    const newTodos = todos.map(todo => (todo.id === Number(itemId)) ? { ...todo, isDone: !todo.isDone } : todo);
    setTodos(newTodos);
  }

  const handleTaskDelete = (index: number) => {
    const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1, todos.length)];
    setTodos(newTodos);
  }

  return (
    <div>
      <h1>Todo App - {new Date().toDateString()}</h1>
      <Form onSubmit={handleNewItem} />
      <Dashboard items={todos} />
      <TodoList items={todos} onToggle={handleTaskToggle} onDelete={handleTaskDelete} />
    </div>
  )
}

export default App
