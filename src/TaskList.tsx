import { Button, Card, Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import styles from './TaskList.module.css';

type TaskListProps = {
    tasks: SimplifiedTask[]
}

type SimplifiedTask = {
    title: string
    id: string
    description: string
    date: string
    startTime: string
    endTime: string
}

export function TaskList({ tasks }: TaskListProps) {
    const [title, setTitle] = useState('')

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            return (title === '' || task.title.toLowerCase().includes(title.toLowerCase()))
        })
    }, [title, tasks])

    const sortedTasks = useMemo(() => {
        return [...filteredTasks].sort((a, b) => {
          const aDateTime = `${a.date} ${a.startTime}`;
          const bDateTime = `${b.date} ${b.startTime}`;
          return aDateTime.localeCompare(bDateTime);
        });
      }, [filteredTasks]);

    return (
        <>
        <Row className='align-items-center mb-4'>
            <Col><h1>Tasks</h1></Col>
            <Col xs='auto'>
                <Stack gap={2} direction='horizontal'>
                    <Link to='/new'>
                        <Button variant="primary">Create</Button>
                    </Link>
                </Stack>
            </Col>
        </Row>
        <Row xs={1} sm={2} lg={3} xl={4} className='g-3'>
            {sortedTasks.map(task => (
                <Col key={task.id}>
                    <TaskCard 
                    id={task.id} 
                    title={task.title} 
                    description={task.description}
                    date={task.date}
                    startTime={task.startTime}
                    endTime={task.endTime} />
                </Col>
            ))}
        </Row>
        </>
    )
}

function TaskCard({ id, title, description, date, startTime, endTime }: SimplifiedTask) {
    return (
        <Card as={Link} to={`/${id}`}
        className={`h-100 text-reset text-decoration-none ${styles.card}`}>
            <Card.Body>
                <Stack gap={2} className="align-items-center justify-content-center h-100">
                    <span className="fs-5">{date.toString()}</span>
                    <span className="fs-5">{title}</span>
                    <span className="fs-5">{description}</span>
                    <span className="fs-5">{startTime}</span>
                    <span className="fs-5">{endTime}</span>
                </Stack>
            </Card.Body>
        </Card>
    )
}