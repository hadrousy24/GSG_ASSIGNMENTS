import { useState, useEffect, useRef } from 'react';
import { IStudent } from '../../types';
import CoursesList from '../courses-list/courses-list.component';
import './student.css'

interface Iprops extends IStudent {
    onAbsentChange: (id: string, absentChange: number) => void;
}

const Student = (props: Iprops) => {
    const [absents, setAbsents] = useState(props.absents);
    const [absentColor, setAbsentColor] = useState('#213547');
    const prevAbsents = useRef<number>(props.absents);

    useEffect(() => {
        if (absents >= 10) {
            setAbsentColor('#ff0000');
        } else if (absents >= 7) {
            setAbsentColor('#fd9c0e');
        } else if (absents >= 5) {
            setAbsentColor('#d6c728');
        } else {
            setAbsentColor('#213547');
        }
    }, [absents]);

    const addAbsent = () => {
        prevAbsents.current = absents;
        setAbsents(absents + 1);
        props.onAbsentChange(props.id, +1);
    }

    const removeAbsent = () => {
        if (absents < 1) { setAbsents(0) }
        else {
            prevAbsents.current = absents;
            setAbsents(absents - 1);
            props.onAbsentChange(props.id, -1);
        };
    }

    const resetAbsent = () => {
        prevAbsents.current = absents;
        setAbsents(0);
        props.onAbsentChange(props.id, -absents);
    }

    return (
        <div className="std-wrapper">
            <div className='data-field'><b>Student:</b> {props.name.toUpperCase() + "!"}</div>
            <div className='data-field'><b>Age:</b> {props.age}</div>
            <div className='data-field' style={{ color: props.isGraduated ? 'green' : 'orange' }}><b>Is Graduated:</b> {props.isGraduated ? 'Yes' : 'No'}</div>
            <div className="data-field">
                <b>Courses List:</b>
                <CoursesList courses={props.courses} />
            </div>
            <div className="absents">
                <b style={{ color: absentColor }}>Previous Absents: </b> {prevAbsents.current}
                <b style={{ color: absentColor }}>Absents: </b> {absents}
                <button onClick={addAbsent}>+</button>
                <button onClick={removeAbsent}>-</button>
                <button onClick={resetAbsent}>Reset</button>
            </div>
        </div>
    )
}

export default Student;