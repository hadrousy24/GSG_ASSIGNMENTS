import { useState } from 'react';
import './App.css'
import Student from './components/student/student.component.tsx'
import AddForm from './components/add-form/add-form.component.tsx';
import { IStudent } from './types.ts';

const COURSES_LIST = ['HTML', 'CSS', 'JavaScript', 'React & Next'];
const INITIAL_LIST: Array<IStudent> = [
  {
    id: "1",
    name: "Basel",
    age: 25,
    isGraduated: true,
    courses: ["Electric Circuits", "DSP", "Communication Systems"],
  },
  {
    id: "2",
    name: "Mohammed",
    age: 24,
    isGraduated: true,
    courses: COURSES_LIST,
  },
  {
    id: "3",
    name: "Hadeel",
    age: 16,
    isGraduated: false,
    courses: ["Math", "English", "Science"],
  },
];

function App() {

  const [totalAbsents, setTotalAbsents] = useState(0);
  const [studentsList, setStudentsList] = useState(INITIAL_LIST)

  const handleAbsentChange = (name: string, absentChange: number) => {
    console.log(`${name} : ${absentChange}`);
    setTotalAbsents(totalAbsents + absentChange);
  }

  const handleAddStudent = (newStudent: IStudent) => {
    setStudentsList([newStudent, ...studentsList]);
  }

  const removeFirst = () => {
    const newStudentsList = [...studentsList];
    newStudentsList.shift();
    setStudentsList(newStudentsList);
  }

  const h1Style = { color: '#69247C', fontSize: '24px' };

  return (
    <>
      <div>
        <h1 style={h1Style}>University of Calgary</h1>
        <AddForm className="addForm" onSubmit={handleAddStudent} />
        <div className="stats">
          <button onClick={removeFirst}>POP Student</button>
          <b>Total Absent: {totalAbsents}</b>
        </div>
        {
          studentsList.map((student) =>
            <Student
              key={student.id}
              id={student.id}
              name={student.name}
              age={student.age}
              isGraduated={student.isGraduated}
              courses={student.courses}
              onAbsentChange={handleAbsentChange}
            />
          )
        }
      </div>
    </>
  )
}

export default App