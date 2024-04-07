import React, { useState } from "react";
import './custom_theme.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";


function Calendar() {
    const [events, setEvents] = useState([]);

    const handleDateClick = (arg) => {
        const title = prompt('Event Title:');
        if (title) {
            const newEvent = {
                title,
                start: arg.date,
                allDay: true // Assuming events are all-day (no specific time)
            };
            setEvents([...events, newEvent]);
        }
    };

    const handleEventClick = (clickInfo) => {
        const deleteConfirmed = window.confirm(`Are you sure you want to delete the event "${clickInfo.event.title}"?`);
        if (deleteConfirmed) {
            const updatedEvents = events.filter(event => event !== clickInfo.event);
            setEvents(updatedEvents);
        }
    };


    return ( 
        <div>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridWeek"
                selectable={true} // Enable day selection
                events={events}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth, dayGridDay, dayGridWeek"
                }}
            />
        </div>
    );
}

export default Calendar;
