import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Task } from './App'

type TaskLayoutProps = {
    tasks: Task[]
}

export function TaskLayout({ tasks }: TaskLayoutProps) {
    const { id } = useParams()
    const task = tasks.find(t => t.id === id)

    if (task == null) return <Navigate to='/' replace />

    return (
        <Outlet context={task} />
    )
}

export function useTask() {
    return useOutletContext<Task>()
}