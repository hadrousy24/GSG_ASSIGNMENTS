import React, { useEffect, useState, useCallback, useRef, useReducer } from 'react'
import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import Form from './components/Form/Form'
import TodoList from './components/TodoList/TodoList'
import { ITodoItem } from './components/types'
import useLocalStorage from './hooks/useLocalStorage.hook'
import reducer from './state/reducer'

function App() {
  // const [todos, setTodos] = useState<ITodoItem[]>([]);
  const [clock, setClock] = useState('');
  const timerRef = useRef<number>();

  const [state, dispatch] = useReducer(reducer, { todos: [], userName: 'Ahmad' })

  const { storedData } = useLocalStorage(state.todos, 'todos-list');

  useEffect(() => {
    dispatch({ type: 'INIT_TODO', payload: storedData || [] })
  }, [storedData])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setClock(new Date().toLocaleTimeString());
    }, 1000)
  }, []);

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }

  const handleNewItem = useCallback((newTask: ITodoItem) => {
    dispatch({ type: 'ADD_TODO', payload: newTask })
  }, [state.todos])

  const handleTaskToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const itemId = Number(e.target.dataset.itemId);
    dispatch({ type: 'TOGGLE_TODO', payload: itemId })
  }

  const handleTaskDelete = (index: number) => {
    const itemId = state.todos[index].id;
    dispatch({ type: 'REMOVE_TODO', payload: itemId })

  }

  return (
    <div>
      <h1>Todo App - Hello {state.userName} - {clock} <button onClick={stopTimer}>Stop</button></h1>
      <Form onSubmit={handleNewItem} />
      <Dashboard items={state.todos} />
      <TodoList items={state.todos} onToggle={handleTaskToggle} onDelete={handleTaskDelete} />
    </div>
  )
}

export default App
