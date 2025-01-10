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
        <div className={`item-wrapper ${props.data.isDone ? 'done' : ''} ${props.data.isUrgent ? 'urgent' : ''}`}>
            <span className='item-details'>
                <div className="round-checkbox">
                    <input
                        type="checkbox"
                        id={`checkbox-${props.data.id}`}
                        checked={props.data.isDone}
                        onChange={props.onToggle}
                        data-item-id={props.data.id}
                    />
                    <label htmlFor={`checkbox-${props.data.id}`}></label>
                </div>
                <span>{props.data.title}</span>
            </span>
            <Trash className='delete' size={20} color="#cf2020" weight="fill" onClick={props.onDelete} />
        </div>
    )
}

export default TodoItem;
