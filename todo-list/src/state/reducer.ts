import { ITodoItem } from "../components/types";

interface IState {
    todos: ITodoItem[];
    userName: string;
}

type Action = { type: 'INIT_TODO', payload: ITodoItem[] } |
{ type: 'ADD_TODO', payload: ITodoItem } |
{ type: 'REMOVE_TODO', payload: number } |
{ type: 'TOGGLE_TODO', payload: number }


const reducer = (state: IState, action: Action): IState => {
    switch (action.type) {
        case 'INIT_TODO': {
            if (state.todos.length === 0) {
                return { ...state, todos: action.payload }
            }
            return state
        }
        case 'ADD_TODO': {
            const newTodo = action.payload;
            newTodo.id = Date.now();
            return { ...state, todos: [...state.todos, newTodo] };
        }
        case 'REMOVE_TODO':
            return {
                ...state, todos: state.todos.filter(todo => todo.id !== action.payload)
            }
        case 'TOGGLE_TODO': {
            return {
                ...state, todos: state.todos.map(todo => (todo.id === action.payload) ? { ...todo, isDone: !todo.isDone } : todo)
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;