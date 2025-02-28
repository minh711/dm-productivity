import React from 'react';
import {
  Calendar,
  Views,
  EventProps,
  dayjsLocalizer,
} from 'react-big-calendar';
import dayjs from 'dayjs';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = dayjsLocalizer(dayjs);

interface Event {
  title: string;
  start: Date;
  end: Date;
  color: string;
  order: number;
}

const events: Event[] = [
  {
    title: 'Meeting',
    start: dayjs().startOf('day').toDate(),
    end: dayjs().endOf('day').toDate(),
    color: '#FF5733',
    order: 2,
  },
  {
    title: 'Workshop',
    start: dayjs().startOf('day').toDate(),
    end: dayjs().endOf('day').toDate(),
    color: '#33FF57',
    order: 3,
  },
  {
    title: 'Call',
    start: dayjs().startOf('day').toDate(),
    end: dayjs().endOf('day').toDate(),
    color: '#3357FF',
    order: 1,
  },
  {
    title: 'Call',
    start: dayjs().startOf('day').toDate(),
    end: dayjs().endOf('day').toDate(),
    color: '#3357FF',
    order: 1,
  },
  {
    title: 'Call',
    start: dayjs().startOf('day').toDate(),
    end: dayjs().endOf('day').toDate(),
    color: '#3357FF',
    order: 1,
  },
];

const EventComponent: React.FC<EventProps<Event>> = ({ event }) => (
  <div>{event.title}</div>
);

const DashboardCalendar: React.FC = () => {
  const eventPropGetter = (event: Event) => ({
    style: { backgroundColor: event.color },
  });

  return (
    <Calendar
      localizer={localizer}
      events={events.sort((a, b) => a.order - b.order)}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 800 }}
      components={{ event: EventComponent }}
      defaultView={Views.MONTH}
      eventPropGetter={eventPropGetter}
    />
  );
};

export default DashboardCalendar;
