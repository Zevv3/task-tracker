import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { NewTask } from "./NewTask";
// import { useMemo } from "react";
// import { v4 as uuidV4 } from "uuid";

export type TaskData = {
  name: string;
  description: string;
  date: Date;
  // time: string;
};

function App() {

  return (
    <Container className='my-4'>
      <Routes>
        <Route path='/' element={<h1>Home</h1>} />
        <Route path='/new' element={<NewTask />} />
        <Route path='/id' element={<h1>Task</h1>} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Container>
  )
}

export default App
