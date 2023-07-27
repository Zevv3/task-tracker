import { TaskData } from './App'
import { TaskForm } from './TaskForm'
import { useTask } from './TaskLayout'

type EditTaskProps = {
    onSubmit: (id: string, data: TaskData) => void
}

export function EditTask({ onSubmit }: EditTaskProps) {
    const task = useTask()

    return (
        <>
            <h1 className='mb-4'>Edit Task</h1>
            <TaskForm
            title={task.title}
            description={task.description}
            date={task.date}
            startTime={task.startTime}
            endTime={task.endTime}
            onSubmit={ data => onSubmit(task.id, data) } />
        </>
    )
}