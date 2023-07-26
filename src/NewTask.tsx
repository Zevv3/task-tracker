import { TaskData } from "./App";
import { TaskForm } from "./TaskForm";

type NewTaskProps= {
    onSubmit: (data: TaskData) => void
}

export function NewTask({ onSubmit }: NewTaskProps) {
    return (
    <>
        <h1 className='mb-4'>New Task</h1>
        <TaskForm 
        onSubmit={ onSubmit } />
    </>
    )
}