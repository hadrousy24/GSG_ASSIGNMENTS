interface Iprops {
    courses: string[];
}

const CoursesList = (props: Iprops) => {
    return (
        <ul className="courses-list">
            {props.courses.map((course, index) => <li key={course + index}>{course}</li>)}
        </ul>
    )
}

export default CoursesList;