import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { NewTask } from "./NewTask";
// import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import { useLocalStorage } from "./useLocalStorage";
import { TaskList } from "./TaskList";

export type Task = {
  id: string
} & TaskData

export type TaskData = {
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  repeatOptions: string;
};

export type RawTask = {
  id: string
} & RawTaskData

export type RawTaskData = {
  title: string
  description: string
  date: Date
  startTime: string;
  endTime: string;
  repeatOptions: string;
}

function App() {
  const [tasks, setTasks] = useLocalStorage<RawTask[]>('tasks', [])

  function onCreateTask({...data}: TaskData) {
    setTasks(prevTasks => {
      return [...prevTasks,
      { ...data, id: uuidV4() }
      ]
    })
  }

  return (
    <Container className='my-4'>
      <Routes>
        <Route path='/' element={ <TaskList 
        tasks={tasks} />} />
        <Route path='/new' element={<NewTask onSubmit={onCreateTask} />} />
        <Route path='/id' element={<h1>Task</h1>} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Container>
  )
}

export default App
