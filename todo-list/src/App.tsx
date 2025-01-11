import React, { useEffect, useState, useCallback } from 'react'
import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import Form from './components/Form/Form'
import TodoList from './components/TodoList/TodoList'
import { ITodoItem } from './components/types'
import useLocalStorage from './hooks/useLocalStorage.hook'

function App() {
  const [todos, setTodos] = useState<ITodoItem[]>([]);
  const [clock, setClock] = useState('');

  const { storedData } = useLocalStorage(todos, 'todos-list');

  useEffect(() => {
    setTodos(storedData || [])
  }, [storedData])

  useEffect(() => {
    setInterval(() => {
      setClock(new Date().toTimeString());
    }, 1000)
  }, []);

  const handleNewItem = useCallback((newTask: ITodoItem) => {
    setTodos([...todos, newTask]);
  }, [todos])

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
      <h1>Todo App - {clock}</h1>
      <Form onSubmit={handleNewItem} />
      <Dashboard items={todos} />
      <TodoList items={todos} onToggle={handleTaskToggle} onDelete={handleTaskDelete} />
    </div>
  )
}

export default App
