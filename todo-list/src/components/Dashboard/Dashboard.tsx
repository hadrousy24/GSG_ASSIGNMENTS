import "./Dashboard.css"
import { ITodoItem } from "../types";
import { useMemo } from "react";

interface IProps {
    items: ITodoItem[];
}

const Dashboard = (props: IProps) => {
    const urgentCount = useMemo(() => {
        return props.items.filter(item => item.isUrgent).length;
    }, [props.items]);

    const completedCount = useMemo(() => {
        return props.items.filter(item => item.isDone).length;
    }, [props.items]);

    return (
        <div className='dashboard-wrapper'>
            <div>
                <b>{props.items.length}</b>
                <span>Created Tasks</span>
            </div>
            <div>
                <b>{urgentCount}</b>
                <span>Urgent Tasks</span>
            </div>
            <div>
                <b>{completedCount}</b>
                <span>Completed Tasks</span>
            </div>

        </div>
    )
}

export default Dashboard
