// import { FormEvent, useEffect, useRef, useState } from "react"
// import { format, addMonths, subMonths, startOfMonth, 
//     endOfMonth, isSameMonth, isSameDay, startOfWeek, endOfWeek, addDays } from 'date-fns';
// import { Button, Col, Form, Modal, Row, Stack, ToggleButton, ToggleButtonGroup } from "react-bootstrap"
// import Select from 'react-select'
// import { TaskData } from "./App"
// import './styles.css'
// import { Link, useNavigate } from "react-router-dom";

// type TaskFormProps = {
//     onSubmit: (data: TaskData) => void
// } & Partial<TaskData>

// type TimeOption = {
//     value: number
//     label: string
// }

// const hours: TimeOption[] = [];
// for (let i = 1; i <= 12; i++) {
//   hours.push({ value: i, label: i.toString() });
// }

// const minutes: TimeOption[] = [];
// for (let i = 0; i < 60; i++) {
//   let label = i.toString();
//   if (i < 10) {
//     label = `0${i.toString()}`;
//   }
//   minutes.push({ value: i, label });
// }


// export function TaskForm({ onSubmit }: TaskFormProps) {
//     const nameRef = useRef<HTMLInputElement>(null)
//     const descriptionRef = useRef<HTMLTextAreaElement>(null)
//     const [showDateModal, setShowDateModal] = useState(false)
//     const [selectedDate, setSelectedDate] = useState<Date>(new Date())
//     const [currentMonth, setCurrentMonth] = useState(new Date())
//     const [selectedStartHour, setSelectedStartHour] = useState<TimeOption | null>(null)
//     const [selectedStartMinute, setSelectedStartMinute] = useState<TimeOption | null>(null)
//     const [selectedEndHour, setSelectedEndHour] = useState<TimeOption | null>(null)
//     const [selectedEndMinute, setSelectedEndMinute] = useState<TimeOption | null>(null)
//     const [repeatOptions, setRepeatOptions] = useState<string[]>(['No Repeat'])
//     const [startTimeOptions, setStartTimeOptions] = useState<string[]>(['AM'])
//     const [endTimeOptions, setEndTimeOptions] = useState<string[]>(['AM'])
//     const navigate = useNavigate()

//     const months = {
//         0: 'January',
//         1: 'February',
//         2: 'March',
//         3: 'April',
//         4: 'May',
//         5: 'June',
//         6: 'July',
//         7: 'August',
//         8: 'September',
//         9: 'October',
//         10: 'November',
//         11: 'December',
//     }

//     const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

//     const handlePrevMonth = () => {
//         setCurrentMonth(subMonths(currentMonth, 1))
//     }

//     const handleNextMonth = () => {
//         setCurrentMonth(addMonths(currentMonth, 1))
//     }

//     const handleStartHourChange = (selectedStartHour: TimeOption | null) => {
//         setSelectedStartHour(selectedStartHour)
//     }

//     const handleStartMinuteChange = (selectedStartMinute: TimeOption | null) => {
//         setSelectedStartMinute(selectedStartMinute)
//     }

//     const handleEndHourChange = (selectedEndHour: TimeOption | null) => {
//         setSelectedEndHour(selectedEndHour)
//     }

//     const handleEndMinuteChange = (selectedEndMinute: TimeOption | null) => {
//         setSelectedEndMinute(selectedEndMinute)
//     }

//     const handleOptionChange = (val: string[]) => {
//         setRepeatOptions(val)
//     }

//     const handleStartTimeOptionChange = (val: string[]) => setStartTimeOptions(val)

//     const handleEndTimeOptionChange = (val: string[]) => setEndTimeOptions(val)

//     // setting default time for time selection
//     useEffect(() => {
//         const now = new Date();
//         const currentHour = now.getHours();
//         const currentMinute = now.getMinutes();
//         const isPM = currentHour > 12;
    
//         const defaultStartHour = hours.find((option) => option.value === (isPM ? currentHour - 12 : currentHour));
//         const defaultStartMinute = minutes.find((option) => option.value === currentMinute);
    
//         setSelectedStartHour(defaultStartHour || null);
//         setSelectedStartMinute(defaultStartMinute || null);
    
//         const oneHourAfter = new Date(now.getTime() + 60 * 60 * 1000);
//         const endHour = oneHourAfter.getHours();
//         const endMinute = oneHourAfter.getMinutes();
//         const isEndPM = endHour > 12;
    
//         const defaultEndHour = hours.find((option) => option.value === (isEndPM ? endHour - 12 : endHour));
//         const defaultEndMinute = minutes.find((option) => option.value === endMinute);
    
//         setSelectedEndHour(defaultEndHour || null);
//         setSelectedEndMinute(defaultEndMinute || null);
//       }, []);

//     function handleSubmit(e: FormEvent) {
//         e.preventDefault()

//         onSubmit({
//             title: nameRef.current!.value,
//             description: descriptionRef.current!.value,
//             date: 
//             startTime: `Start: ${selectedStartHour?.label}:${selectedStartMinute?.label} ${startTimeOptions}`,
//             endTime: `End: ${selectedEndHour?.label}:${selectedEndMinute?.label} ${endTimeOptions}`,
//             repeatOptions: `${repeatOptions}`,
//         })
//         navigate('..')
//     }

//     function handleDateConfirm() {
//         if (selectedDate) {
//             setShowDateModal(false)
//         } else {
//             setShowDateModal(true)
//         }
//     }

//     const renderCalendar = () => {
//         const monthStart = startOfMonth(currentMonth)
//         const monthEnd = endOfMonth(monthStart)
//         const startDate = startOfWeek(monthStart)
//         const endDate = endOfWeek(monthEnd)

//         const handleDayClick = (date: Date) => {
//             setSelectedDate(date)
//         }

//         const rows: JSX.Element[] = []
//         let week: JSX.Element[] = []
//         let day = startDate
        
//         while (day <= endDate) {
//             for (let i = 0; i < 7; i++) {
//                 const currentDay = day
//                 week.push(
//                     <div key={currentDay.toString()}
//                     className={`day ${!isSameMonth(day, monthStart) ? 'disabled' : ''} 
//                     ${isSameDay(day, selectedDate) ? 'selected' : ''}`}
//                     onClick={() => handleDayClick(currentDay)} >
//                         {format(currentDay, 'd')}
//                     </div>
//                 )
//                 day = addDays(day, 1)
//             }
//             {rows.push(<Stack key={day.toString()} direction='horizontal' gap={4}>{week}</Stack>)}
//             {week = []}
//         }

//         return <div className='calendar'>{rows}</div>
//     }

//     return(
//         <Form onSubmit={handleSubmit}>
//             <Stack gap={4}>
//                 <Row>
//                 <Form.Group controlId='title'>
//                     <Form.Label>Task Name</Form.Label>
//                     <Form.Control ref={nameRef} required />
//                 </Form.Group>
//                 </Row>
//                 <Row>
//                 <Form.Group controlId='description'>
//                     <Form.Label>Description</Form.Label>
//                     <Form.Control required as='textarea' 
//                     ref={descriptionRef} rows={5} />
//                 </Form.Group>
//                 </Row>
//                 <div className='date-and-time'>
//                     <Col>
//                         <Row>
//                             <Form.Group controlId='date' className='date-group'>
//                                 <Form.Label>Date</Form.Label> <br />
//                                 <Button variant='secondary' onClick={() => setShowDateModal(true)}>
//                                     {selectedDate ? format(selectedDate, 'MMM d, yyyy') : 'Select Date'}
//                                 </Button>
//                             </Form.Group>
//                         </Row>
//                         <Row>
//                             <ToggleButtonGroup 
//                             type='radio'
//                             name='repeat-options'
//                             value={repeatOptions} 
//                             onChange={handleOptionChange} >
//                                 <Stack gap={2}>
//                                     <ToggleButton 
//                                     className="repeat-options"
//                                     variant='outline-primary'
//                                     id='No Repeat' 
//                                     value={['No Repeat']}>
//                                         No Repeat
//                                     </ToggleButton>
//                                     <ToggleButton 
//                                     className="repeat-options"
//                                     variant='outline-primary' 
//                                     id='Every Dayt' 
//                                     value={['Every Day']}>
//                                         Every Day
//                                     </ToggleButton>
//                                     <ToggleButton 
//                                     className="repeat-options"
//                                     variant='outline-primary' 
//                                     id='Every Week' 
//                                     value={['Every Week']}>
//                                         Every Week
//                                     </ToggleButton>
//                                 </Stack>
//                                 <Stack gap={2}>
//                                     <ToggleButton 
//                                     className="repeat-options"
//                                     variant='outline-primary' 
//                                     id='Every Month' 
//                                     value={['Every Month']}>
//                                         Every Month 
//                                     </ToggleButton>
//                                     <ToggleButton 
//                                     className="repeat-options"
//                                     variant='outline-primary' 
//                                     id='Eevry Year' 
//                                     value={['Every Year']}>
//                                         Every Year
//                                     </ToggleButton>
//                                 </Stack>
//                             </ToggleButtonGroup>
//                         </Row>
//                     </Col>
//                     <Form.Group controlId='time'>
//                     <Row>
//                     <Form.Label>Start Time</Form.Label>
//                     <Col>
//                         <Stack gap={2} className="time-stack">
//                             <Select options={hours}
//                             value={selectedStartHour}
//                             onChange={handleStartHourChange}
//                             isSearchable={true}
//                             placeholder="HH"
//                             className="time-input"
//                             / >
//                             <Select options={minutes}
//                             value={selectedStartMinute}
//                             onChange={handleStartMinuteChange}
//                             isSearchable={true}
//                             placeholder="MM"
//                             className="time-input"
//                             / >
//                         </Stack>
//                     </Col>
//                     <Col>
//                         <ToggleButtonGroup 
//                         vertical={true} 
//                         type="radio" 
//                         name="start-am-pm" 
//                         defaultValue={'AM'}
//                         value={startTimeOptions}
//                         onChange={handleStartTimeOptionChange}>
//                             <ToggleButton id="start-am" value={'AM'} className='time-button'>
//                             AM
//                             </ToggleButton>
//                             <ToggleButton id="start-pm" value={'PM'} className='time-button'>
//                             PM
//                             </ToggleButton>
//                         </ToggleButtonGroup>
//                     </Col>
//                     </Row>
//                     <Row>
//                     <Form.Label>End Time</Form.Label>
//                     <Col>
//                         <Stack gap={2} className="time-stack">
//                             <Select options={hours}
//                             value={selectedEndHour}
//                             onChange={handleEndHourChange}
//                             isSearchable={true}
//                             placeholder="HH"
//                             className="time-input"
//                             / >
//                             <Select options={minutes}
//                             value={selectedEndMinute}
//                             onChange={handleEndMinuteChange}
//                             isSearchable={true}
//                             placeholder="MM"
//                             className="time-input"
//                             / >
//                         </Stack>
//                     </Col>
//                     <Col>
//                         <ToggleButtonGroup 
//                         vertical={true} 
//                         type="radio" 
//                         name="end-am-pm" 
//                         defaultValue={'AM'}
//                         value={endTimeOptions}
//                         onChange={handleEndTimeOptionChange}>
//                             <ToggleButton id="end-am" value={'AM'} className='time-button'>
//                             AM
//                             </ToggleButton>
//                             <ToggleButton id="end-pm" value={'PM'} className='time-button'>
//                             PM
//                             </ToggleButton>
//                         </ToggleButtonGroup>
//                     </Col>
//                     </Row>
//                     </Form.Group>
//                 </div>
//             </Stack>
//             <br />
//             <Row>
//                 <Stack direction="horizontal" gap={2} className='justify-content-end'>
//                         <Button type='submit' variant='primary'>Save</Button>
//                     <Link to='..'>
//                         <Button type='button' variant='outline-secondary'>Cancel</Button>
//                     </Link>
//                 </Stack>
//             </Row>

//         <Modal show={showDateModal} onHide={() => setShowDateModal(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>Select Date</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="calendar-container" align-items='center'>
//               <div className="calendar-header">
//                 <Button variant="link" onClick={handlePrevMonth}>&lt;</Button>
//                 <span>{format(currentMonth, 'MMMM yyyy')}</span>
//                 <Button variant="link" onClick={handleNextMonth}>&gt;</Button>
//               </div>
//               <Stack className="weekdays" direction='horizontal' gap={4}>
//                 {weekDays.map(day => (
//                   <div key={day} className="weekday">{day}</div>
//                 ))}
//               </Stack>
//               {renderCalendar()}
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant='secondary' onClick={() => setShowDateModal(false)}>
//               Cancel
//             </Button>
//             <Button variant='primary' 
//             onClick={() => handleDateConfirm()}>
//               Confirm
//             </Button>
//           </Modal.Footer>
//         </Modal>
//         </Form>
//     )
// }