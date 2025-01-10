import { ITodoItem } from "../types";
import "./form.css"

interface IProps {
    onSubmit: (newTask: ITodoItem) => void;
}

const Form = (props: IProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const title: string = e.currentTarget["task"].value;
        const isUrgent: boolean = e.currentTarget["urgent"].checked;
        if (title.length > 3) {
            const newTask: ITodoItem = {
                id: Date.now(),
                title,
                isUrgent,
                isDone: false
            }
            props.onSubmit(newTask);
        }
    }

    return (
        <form className='form-wrapper' onSubmit={handleSubmit}>
            <input className="task-input" type="text" name="task"
                placeholder='Type todo here...' />
            <div>
                <label htmlFor="urgent">Urgent</label>
                <input
                    type="checkbox" id="urgent" name="urgent" />
            </div>
            <input className="submit" type="submit" value="Add Todo" />
        </form>
    )
}

export default Form;
