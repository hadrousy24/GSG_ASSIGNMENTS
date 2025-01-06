import { Trash } from '@phosphor-icons/react'
import "./TodoItem.css"
import { ITodoItem } from '../types'

interface IProps {
    data: ITodoItem;
    onToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDelete: () => void;
}

const TodoItem = (props: IProps) => {
    return (
        <div className='item-wrapper'>
            <input
                type="checkbox"
                checked={props.data.isDone}
                onChange={props.onToggle}
                data-item-id={props.data.id}
            />
            <span>{props.data.title}</span>
            <span><Trash size={24} color="#ff0000" weight="fill" onClick={props.onDelete} /></span>
        </div>
    )
}

export default TodoItem;
