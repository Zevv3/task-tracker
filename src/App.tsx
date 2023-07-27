import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { NewTask } from "./NewTask";
import { v4 as uuidV4 } from "uuid";
import { useLocalStorage } from "./useLocalStorage";
import { TaskList } from "./TaskList";
import { TaskLayout } from "./TaskLayout";
import { Task } from "./Task";
import { EditTask } from "./EditTask";
import { addDays, addMonths } from "date-fns";

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
    const newTask = { ...data, id: uuidV4() }

    if (data.repeatOptions && data.repeatOptions !== 'No Repeat') {
      const repeatedTasks = generateRepeatedTasks(newTask, data.repeatOptions)

      setTasks((prevTasks => 
        [...prevTasks, ...repeatedTasks]))
    } else {
    setTasks(prevTasks => {
      return [...prevTasks, newTask]})
    }
  }

  function generateRepeatedTasks(data: TaskData, repeatOption: string): Task[] {
    const tasks: Task[] = [];

    if (repeatOption === 'No Repeat') {
      tasks.push({ ...data, id: uuidV4() });
    } else if (repeatOption === 'Every Day') {
      for (let i = 0; i < 365; i++) {
        const newDate = addDays(new Date(data.date), i)
        tasks.push({ ...data, id: uuidV4(), date: newDate })
      }
    } else if (repeatOption === 'Every Week') {
      for (let i = 0; i < 52; i++) {
        const newDate = addDays(new Date(data.date), i * 7)
        tasks.push({ ...data, id: uuidV4(), date: newDate })
      }
    } else if (repeatOption === 'Every Month') {
      for (let i = 0; i < 12; i++) {
        const newDate = addMonths(new Date(data.date), i)
        tasks.push({ ...data, id: uuidV4(), date: newDate })
      }
    } else if (repeatOption === 'Every Year') {
      for (let i = 0; i < 10; i++) {
        const newDate = addMonths(new Date(data.date), i * 12)
        tasks.push({ ...data, id: uuidV4(), date: newDate})
      }
    }
    return tasks
  }

  function onDeleteTask(id: string) {
    setTasks(prevTasks => {
      return prevTasks.filter(task => task.id !==id)
    })
  }

  function onUpdateTask(id: string, { ...data }: TaskData) {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task.id === id) {
          return { ...task, ...data }
        } else {
          return task
        }
      })
    })
  }

  return (
    <Container className='my-4'>
      <Routes>
        <Route path='/' element={ <TaskList 
        tasks={tasks} />} />
        <Route path='/new' element={<NewTask onSubmit={onCreateTask} />} />
        <Route path='/:id' element={<TaskLayout tasks={tasks} />}>
          <Route index element={<Task onDelete={onDeleteTask} />} />
          <Route path='edit' element={<EditTask onSubmit={onUpdateTask}/>} />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Container>
  )
}

export default App
