import { Button, Col, Row, Stack } from "react-bootstrap";
import { useTask } from './TaskLayout'
import { Link, useNavigate } from "react-router-dom";

type TaskProps = {
    onDelete: (id: string) => void
}

export function Task({ onDelete }: TaskProps) {
    const task = useTask()
    const navigate = useNavigate()
    
    if (!task) {
        return (
            <Button onClick={() => {
                navigate('/')    
            }}
            variant='primary'>Task Not Found, return to homepage</Button>
        )
    }

    return (
        <>
        <Row className='align-items-center mb-4'>
            <Col>
                <h1>{task.title}</h1>
                <h3>{task.date}</h3>
                <h5>Start: {task.startTime} End: {task.endTime}</h5>
            </Col>
            <Col xs='auto'>
                <Stack gap={2} direction='horizontal'>
                    <Link to={`/${task.id}/edit`}>
                        <Button variant="primary">Edit</Button>
                    </Link>
                    <Button onClick={() => {
                        onDelete(task.id)
                        navigate('/')
                    }} variant='outline-danger'>Delete</Button>
                    <Link to='/'>
                        <Button variant="outline-secondary">Back</Button>
                    </Link>
                </Stack>
            </Col>
        </Row>
        <p>
        {task.description}
        </p>
        </>
    )
}