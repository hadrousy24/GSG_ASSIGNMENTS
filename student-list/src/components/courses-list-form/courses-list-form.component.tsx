import React, { useState } from "react";

interface IProps {
    value: string[];
    onSubmit: (list: string[]) => void;
}

const CoursesListForm = (props: IProps) => {
    const [coursesList, setCoursesList] = useState<string[]>(props.value);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newCourse = event.currentTarget["courseName"].value;
        const newCoursesList = [...coursesList, newCourse];
        setCoursesList(newCoursesList);
        props.onSubmit(newCoursesList);
    }


    return (
        <div className="addCourseForm">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="cName">Enter Course: </label>
                    <input type="text" name="courseName" id="cName" required />
                </div>
                <button type="submit">Submit</button>
            </form>
            <ul>
                {coursesList.map((course, index) => <li id={course + index}>{course}</li>)}
            </ul>
        </div>
    );

}

export default CoursesListForm;