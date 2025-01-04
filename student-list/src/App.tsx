import { useEffect, useState, useRef } from 'react';
import './App.css'
import { IStudent } from './types.ts';

import Student from './components/student/student.component.tsx'
import AddForm from './components/add-form/add-form.component.tsx';
import useLocalStorage from './hooks/useLocalStorage.hook.ts';

function App() {
  const [studentsList, setStudentsList] = useState<IStudent[]>([]);
  const [totalAbsents, setTotalAbsents] = useState(0);
  const lastStdRef = useRef<HTMLDivElement>(null);

  const { storedData } = useLocalStorage(studentsList, 'students-list');

  useEffect(() => {
    const stdList: IStudent[] = storedData || [];
    const totalAbs = stdList.reduce((prev, curr) => { return prev + curr.absents }, 0);
    setStudentsList(storedData);
    setTotalAbsents(totalAbs);
  }, [storedData]);

  const removeFirst = () => {
    const newStudentsList = [...studentsList];
    newStudentsList.shift();
    setStudentsList(newStudentsList);
  }

  const handleAbsentChange = (id: string, absentChange: number) => {
    setTotalAbsents(totalAbsents + absentChange);
    setStudentsList(studentsList.map(std => std.id === id ? { ...std, absents: std.absents + absentChange } : std));
  }

  const handleAddStudent = (newStudent: IStudent) => {
    setStudentsList([newStudent, ...studentsList]);
  }

  const scrollToLast = () => {
    if (lastStdRef.current) {
      lastStdRef.current.scrollIntoView({ 'behavior': 'smooth' });
    }
  }

  const h1Style = { color: '#69247C', fontSize: '24px' };

  return (
    <>
      <div className='main wrapper'>
        <h1 style={h1Style}>Welcome to GSG React/Next Course</h1>
        <AddForm className="addForm" onSubmit={handleAddStudent} />
        <div className="stats">
          <button onClick={removeFirst}>POP Student</button>
          <button onClick={scrollToLast}>Scroll to Last</button>
          <b style={{ fontSize: '12px', fontWeight: 100 }}>Total Absent: {totalAbsents}</b>
        </div>
        {
          studentsList.map(student =>
            <Student
              key={student.id}
              id={student.id}
              name={student.name}
              age={student.age}
              absents={student.absents}
              isGraduated={student.isGraduated}
              courses={student.courses}
              onAbsentChange={handleAbsentChange}
            />
          )
        }
      </div>
      <div ref={lastStdRef}></div>
    </>
  )
}

export default App;
