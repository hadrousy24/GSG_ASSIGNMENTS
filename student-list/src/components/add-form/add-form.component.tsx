import { useState } from 'react';
import './add-form.css'
import { IStudent } from '../../types';
import CoursesListForm from '../courses-list-form/courses-list-form.component';

interface IProps {
    className?: string;
    onSubmit: (std: IStudent) => void;
}

const INITIAL_STUDENT = {
    id: "",
    name: "",
    age: 0,
    isGraduated: false,
    courses: []
}

const AddForm = (props: IProps) => {
    const [student, setStudent] = useState<IStudent>(INITIAL_STUDENT);
    const [isOpen, setIsOpen] = useState<Boolean>(false);

    const handleChange = (field: string, value: any) => {
        setStudent({ ...student, [field]: value })
    }

    const handleClear = () => {
        setStudent(INITIAL_STUDENT);
    }

    const handleSubmit = () => {
        const newStudent: IStudent = { ...student, id: Date.now().toString() }
        props.onSubmit(newStudent);
        handleClear();
    }

    const handleCoursesChange = (changedCoursesList: string[]) => {
        setStudent({ ...student, courses: changedCoursesList });
    }

    return (
        <div className={`wrapper ${props.className} ${isOpen ? 'open' : 'closed'}`} >
            <button onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <span>&and; Close Form </span> : <span>&or; Open Form </span>}
            </button>
            <div className='input'>
                <label htmlFor="name">Student Name:</label>
                <input
                    id="name"
                    type="text"
                    value={student.name}
                    onChange={e => handleChange('name', e.target.value)}
                />
            </div>
            <div className='input'>
                <label htmlFor="age">Student age:</label>
                <input
                    id="age"
                    type="number"
                    min={17} max={40}
                    value={student.age}
                    onChange={e => handleChange('age', e.target.value)}
                />
            </div>
            <div className='input'>
                <label htmlFor="isGraduated">Is Student Graduated:</label>
                <input
                    id="isGraduated"
                    type="checkbox"
                    checked={student.isGraduated}
                    onChange={e => handleChange('isGraduated', e.target.checked)}
                />
            </div>
            <div>
                <CoursesListForm
                    value={student.courses}
                    onSubmit={handleCoursesChange}
                />
            </div>
            <div className='actions'>
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={handleClear}>Clear</button>
            </div>
        </div >
    )
};

export default AddForm;