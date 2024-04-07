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
                id: generateUniqueId(), // Generate a unique ID for the event
                title,
                start: arg.date,
                allDay: true
            };
            setEvents([...events, newEvent]);
        }
    };

    const handleEventClick = (clickInfo) => {
        const deleteConfirmed = window.confirm(`Are you sure you want to delete the event "${clickInfo.event.title}"?`);
        if (deleteConfirmed) {
            const eventId = clickInfo.event.id; // Get the ID of the clicked event
            const updatedEvents = events.filter(event => event.id !== eventId); // Filter out the event to be deleted
            setEvents(updatedEvents); // Update the events state with the filtered array
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
                    right: "dayGridMonth,dayGridDay,dayGridWeek"
                }}
            />
        </div>
    );
}

export default Calendar;

function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9); // Generate a random ID
}