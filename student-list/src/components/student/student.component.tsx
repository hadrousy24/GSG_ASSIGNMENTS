import './student.css'
import CoursesList from '../courses-list/courses-list.component';
import { useState } from 'react';
import { IStudent } from '../../types';

interface Iprops extends IStudent {
    onAbsentChange: (id: string, absentChange: number) => void;
}

const Student = (props: Iprops) => {
    const [absents, setAbsents] = useState(props.absents);
    const addAbsent = () => {
        setAbsents(absents + 1);
        props.onAbsentChange(props.id, +1);
    }
    const removeAbsent = () => {
        if (absents < 1) { setAbsents(0) }
        else {
            setAbsents(absents - 1);
            props.onAbsentChange(props.id, -1);
        };
    }
    const resetAbsent = () => {
        setAbsents(0);
        props.onAbsentChange(props.id, -absents);
    }
    return (
        <div className="std-wrapper">
            <div><b>Student:</b> {props.name.toUpperCase() + "!"}</div>
            <div><b>Age:</b> {props.age}</div>
            <div><b>Is Graduated:</b> {props.isGraduated ? 'Yes' : 'No'}</div>
            <CoursesList courses={props.courses} />
            <div>absents: {absents}</div>
            <button onClick={addAbsent}>+</button>
            <button onClick={removeAbsent}>-</button>
            <button onClick={resetAbsent}>Reset</button>
            <hr />
        </div>
    )
}

export default Student;