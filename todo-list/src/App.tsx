import './App.css'
import Dashboard from './components/Dashboard/Dashboard'
import Form from './components/Form/Form'
import TodoList from './components/TodoList/TodoList'

function App() {
  return (
    <div>
      <h1>Todo App - {new Date().toDateString()}</h1>
      <Form />
      <Dashboard />
      <TodoList />
    </div>
  )
}

export default App
