import { format, addDays, startOfMonth, endOfMonth, isSameMonth, isSameDay, startOfWeek, endOfWeek } from 'date-fns';
import { Stack } from 'react-bootstrap';
import styles from './Calendar.module.css'

export type CalendarProps = {
  currentMonth: Date;
  selectedDate: Date | null;
  handleDayClick: (date: Date) => void;
};

export function renderCalendar({ currentMonth, selectedDate, handleDayClick }: CalendarProps) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const rows: JSX.Element[] = [];
  let week: JSX.Element[] = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const currentDay = day;
      week.push(
        <div
          key={currentDay.toString()}
          className={`day ${!isSameMonth(day, monthStart) ? 'disabled' : ''} ${
            isSameDay(day, selectedDate ? selectedDate : new Date()) ? styles.selected : ''
          }`}
          onClick={() => handleDayClick(currentDay)}
        >
          {format(currentDay, 'd')}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(<Stack key={day.toString()} direction='horizontal' gap={4}>{week}</Stack>);
    week = [];
  }

  return <div className='calendar'>{rows}</div>;
}
