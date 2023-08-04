import { Button, Card, Col, Row, Stack, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import styles from './TaskList.module.css';
import { renderCalendar } from "./Calendar";
import { addMonths, format, isSameDay, subMonths } from "date-fns";

type TaskListProps = {
    tasks: SimplifiedTask[]
}

type SimplifiedTask = {
    title: string
    id: string
    description: string
    date: Date
    startTime: string
    endTime: string
}

export function TaskList({ tasks }: TaskListProps) {
    const [title, setTitle] = useState('')
    const [showDateModal, setShowDateModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [currentMonth, setCurrentMonth] = useState(new Date())

    const filteredTasks = useMemo(() => {
        return tasks.filter(task => {
            return (title === '' || task.title.toLowerCase().includes(title.toLowerCase()))
            && (selectedDate === null || isSameDay(new Date(task.date), selectedDate))})
    }, [title, selectedDate, tasks])

    const handlePrevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1))
    }

    const handleNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1))
    }

    const handleDayClick = (date: Date) => {
        setSelectedDate(date);
      };

    const sortedTasks = useMemo(() => {
        return [...filteredTasks].sort((a, b) => {
            const aPeriod = a.startTime.split(' ')[2];
            const [aHour, aMinute] = a.startTime.split(' ')[1].split(':').map(Number);
            const aTotalMinutes = aPeriod.toLowerCase() === 'pm' ? (aHour < 12 ? aHour + 12 : aHour) * 60 + aMinute + 720 : aHour * 60 + aMinute;
        
            const bPeriod = b.startTime.split(' ')[2];
            const [bHour, bMinute] = b.startTime.split(' ')[1].split(':').map(Number);
            const bTotalMinutes = bPeriod.toLowerCase() === 'pm' ? (bHour < 12 ? bHour + 12 : bHour) * 60 + bMinute + 720 : bHour * 60 + bMinute;
        
            return aTotalMinutes - bTotalMinutes;
        });
    }, [filteredTasks]);

    function handleDateCancel() {
        setSelectedDate(null)
        setShowDateModal(false)
    }

    function handleDateConfirm() {
    if (selectedDate) {
        setSelectedDate(selectedDate)
        setShowDateModal(false)
    } else {
        setShowDateModal(true)
    }}

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

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
        <Form>
            <Row className='mb-4'>
                <Col>
                    <Form.Group controlId='title'>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' value={title}
                        onChange={e => setTitle(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId='date'>
                        <Form.Label>Date</Form.Label>
                        <Row>
                            <Button variant='secondary' 
                            onClick={() => setShowDateModal(true)}>
                                {selectedDate ? format(selectedDate, 'MMM do, yyyy') : 'Select Date'}
                            </Button>
                        </Row>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
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
        <Modal show={showDateModal} onHide={() => setShowDateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Select Date</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="calendar-container" align-items='center'>
              <div className="calendar-header">
                <Button variant="link" onClick={handlePrevMonth}>&lt;</Button>
                <span>{format(currentMonth, 'MMMM yyyy')}</span>
                <Button variant="link" onClick={handleNextMonth}>&gt;</Button>
              </div>
              <Stack className="weekdays" direction='horizontal' gap={4}>
                {weekDays.map(day => (
                  <div key={day} className="weekday">{day}</div>
                ))}
              </Stack>
              {renderCalendar({ currentMonth, selectedDate, handleDayClick })}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='outline-danger'
            onClick={() => handleDateCancel()}>
                Cancel
            </Button>
            <Button variant='primary' 
            onClick={() => handleDateConfirm()}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
        </>
    )
}

function TaskCard({ id, title, description, date, startTime, endTime }: SimplifiedTask) {
    return (
        <Card as={Link} to={`/${id}`}
        className={`h-100 text-reset text-decoration-none ${styles.card}`}>
            <Card.Body>
                <Stack gap={2} className="align-items-center justify-content-center h-100">
                    <span className="fs-5">{format(date, 'MMM do yyyy')}</span>
                    <span className="fs-5">{title}</span>
                    <span className={`fs-5 ${styles.desc}`}>{description}</span>
                    <span className="fs-5">{startTime}</span>
                    <span className="fs-5">{endTime}</span>
                </Stack>
            </Card.Body>
        </Card>
    )
}