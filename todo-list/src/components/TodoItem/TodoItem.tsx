import { Trash } from '@phosphor-icons/react'

const TodoItem = () => {
    return (
        <div>
            <input type="checkbox" name="" id="" />
            <span>Todo Text here</span>
            <span><Trash size={24} color="#ff0000" weight="fill" /></span>
        </div>
    )
}

export default TodoItem;
