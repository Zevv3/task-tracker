import { FormEvent, useRef, useState } from "react"
import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap"
import { TaskData } from "./App"

type TaskFormProps = {
    onSubmit: (data: TaskData) => void
}

export function TaskForm({ onSubmit }: TaskFormProps) {
    const nameRef = useRef<HTMLInputElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const [showModal, setShowModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)


    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        onSubmit({
            name: nameRef.current!.value,
            description: descriptionRef.current!.value,
            date: selectedDate || new Date(),
            // tim
        })
    }

    function handleDateSelection(date: Date) {
        setSelectedDate(date);
        setShowModal(false)
    }

    function handleCloseModal() {
        setShowModal(false)
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
                        <Form.Label></Form.Label>
                        <Button variant='secondary' onClick={() => setShowModal(true)}>
                            Select Date
                        </Button>
                    </Form.Group>
                </Col>    
                <Col>
                
                </Col>
                </Row>
            </Stack>

            {/* Date selection Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Date</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Calendar goes here
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant='primary' onClick={() => handleDateSelection(selectedDate  || new Date())}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </Form>
    )
}