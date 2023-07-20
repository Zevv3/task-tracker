import { FormEvent, useRef, useState } from "react"
import { format, addMonths, subMonths, startOfMonth, 
    endOfMonth, isSameMonth, isSameDay, startOfWeek, endOfWeek, addDays } from 'date-fns';
import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap"
import Select from 'react-select'
import { TaskData } from "./App"
import './styles.css'

type TaskFormProps = {
    onSubmit: (data: TaskData) => void
} & CalendarProps

type CalendarProps = {
    selectedDate: Date
    handleDateSelection: (date: Date) => void
    closeModal: () => void
    showModal: boolean
}

type TimeOption = {
    value: number
    label: number
}

const hours: TimeOption[] = [
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
    { value: 11, label: 11 },
    { value: 12, label: 12 },
]

const minutes: TimeOption[] = [
    { value: 0, label: 0 },
    { value: 1, label: 1 },
    { value: 2, label: 2 },
    { value: 3, label: 3 },
    { value: 4, label: 4 },
    { value: 5, label: 5 },
    { value: 6, label: 6 },
    { value: 7, label: 7 },
    { value: 8, label: 8 },
    { value: 9, label: 9 },
    { value: 10, label: 10 },
    { value: 11, label: 11 },
    { value: 12, label: 12 },
    { value: 13, label: 13 },
    { value: 14, label: 14 },
    { value: 15, label: 15 },
    { value: 16, label: 16 },
    { value: 17, label: 17 },
    { value: 18, label: 18 },
    { value: 19, label: 19 },
    { value: 20, label: 20 },
    { value: 21, label: 21 },
    { value: 22, label: 22 },
    { value: 23, label: 23 },
    { value: 24, label: 24 },
    { value: 25, label: 25 },
    { value: 26, label: 26 },
    { value: 27, label: 27 },
    { value: 28, label: 28 },
    { value: 29, label: 29 },
    { value: 30, label: 30 },
    { value: 31, label: 31 },
    { value: 32, label: 32 },
    { value: 33, label: 33 },
    { value: 34, label: 34 },
    { value: 35, label: 35 },
    { value: 36, label: 36 },
    { value: 37, label: 37 },
    { value: 38, label: 38 },
    { value: 39, label: 39 },
    { value: 40, label: 40 },
    { value: 41, label: 41 },
    { value: 42, label: 42 },
    { value: 43, label: 43 },
    { value: 44, label: 44 },
    { value: 45, label: 45 },
    { value: 46, label: 46 },
    { value: 47, label: 47 },
    { value: 48, label: 48 },
    { value: 49, label: 49 },
    { value: 50, label: 50 },
    { value: 51, label: 51 },
    { value: 52, label: 52 },
    { value: 53, label: 53 },
    { value: 54, label: 54 },
    { value: 55, label: 55 },
    { value: 56, label: 56 },
    { value: 57, label: 57 },
    { value: 58, label: 58 },
    { value: 59, label: 59 },
]

export function TaskForm({ onSubmit }: TaskFormProps) {
    const nameRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const [showDateModal, setShowDateModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [selectedStartHour, setSelectedStartHour] = useState<TimeOption | null>(null)
    const [selectedStartMinute, setSelectedStartMinute] = useState(null)
    const [selectedEndHour, setSelectedEndHour] = useState(null)
    const [selectedEndMinute, setSelectedEndMinute] = useState(null)

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const handlePrevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1))
    }

    const handleNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1))
    }

    const handleStartHourChange = (selectedStartHour: TimeOption | null) => {
        setSelectedStartHour(selectedStartHour)
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        onSubmit({
            name: nameRef.current!.value,
            description: descriptionRef.current!.value,
            date: selectedDate || new Date(),
            // time
        })
    }

    function handleDateConfirm() {
        if (selectedDate) {
            setShowDateModal(false)
        } else {
            setShowDateModal(true)
        }
    }

    const renderCalendar = () => {
        const monthStart = startOfMonth(currentMonth)
        const monthEnd = endOfMonth(monthStart)
        const startDate = startOfWeek(monthStart)
        const endDate = endOfWeek(monthEnd)

        const handleDayClick = (date: Date) => {
            setSelectedDate(date)
        }

        const rows: JSX.Element[] = []
        let week: JSX.Element[] = []
        let day = startDate
        
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const currentDay = day
                week.push(
                    <div key={currentDay.toString()}
                    className={`day ${!isSameMonth(day, monthStart) ? 'disabled' : ''} 
                    ${isSameDay(day, selectedDate) ? 'selected' : ''}`}
                    onClick={() => handleDayClick(currentDay)} >
                        {format(currentDay, 'd')}
                    </div>
                )
                day = addDays(day, 1)
            }
            {rows.push(<Stack key={day.toString()} direction='horizontal' gap={4}>{week}</Stack>)}
            {week = []}
        }

        return <div className='calendar'>{rows}</div>
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                <Form.Group controlId='name'>
                    <Form.Label>Task Name</Form.Label>
                    <Form.Control ref={nameRef} required />
                </Form.Group>
                </Row>
                <Row>
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control required as='textarea' 
                    ref={descriptionRef} rows={10} />
                </Form.Group>
                </Row>
                <Row>
                <Col>
                    <Form.Group controlId='date'>
                        <Button variant='secondary' onClick={() => setShowDateModal(true)}>
                        <Form.Label>Date</Form.Label>
                            {selectedDate ? format(selectedDate, 'MMM d, yyyy') : 'Select Date'}
                        </Button>
                    </Form.Group>
                </Col>    
                <Col>
                    <Form.Group controlId='start-time'>
                        <Select options={hours}
                        value={selectedStartHour}
                        onChange={handleStartHourChange}
                        isSearchable={true}
                        placeholder="HH"
                        / >
                        <Select options={minutes}
                        value={selectedStartMinute}
                        onChange={handleStartMinuteChange}
                        isSearchable={true}
                        placeholder="MM"
                        / >
                    </Form.Group>
                </Col>
                <Col>
                    
                </Col>
                </Row>
            </Stack>

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
              {renderCalendar()}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => setShowDateModal(false)}>
              Cancel
            </Button>
            <Button variant='primary' 
            onClick={() => handleDateConfirm()}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
        </Form>
    )
}