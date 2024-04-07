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
import React, { useState } from "react";
import './custom_theme.css'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {
    const [events, setEvents] = useState([]);

    // Helper function to generate a unique ID for events
    function generateUniqueId() {
        return Math.random().toString(36).substr(2, 9);
    }

    // Helper function to generate recurring events based on original event and end date
    function generateRecurringEvents(originalEvent, endDate) {
        const { start } = originalEvent;
        const repeatDays = originalEvent.dow;
        const recurringEvents = [];
    
        let currentDate = new Date(start);
        const lastDate = new Date(endDate);
    
        currentDate.setHours(0, 0, 0, 0);
    
        while (currentDate <= lastDate) {
            const dayOfWeek = currentDate.getDay();
    
            if (repeatDays.includes(dayOfWeek)) {
                const recurringEvent = {
                    ...originalEvent,
                    id: generateUniqueId(),
                    start: new Date(currentDate),
                    title: originalEvent.title,
                };
    
                recurringEvents.push(recurringEvent);
            }
    
            // Move to the next day
            currentDate.setDate(currentDate.getDate() + 1);
        }
    
        console.log('Generated recurring events:', recurringEvents);
        return recurringEvents;
    }
    const handleDateClick = (arg) => {
        console.log('Date clicked:', arg.date);
    
        const title = prompt('Event Title:');
        if (title) {
            const repeatDays = prompt('Repeat on which days? (e.g., "1,3,5" for Mon, Wed, Fri)');
            const endDateString = prompt('Repeat until (YYYY-MM-DD):');
            const endDate = new Date(endDateString);
    
            const newEvent = {
                title,
                start: arg.date,
                dow: repeatDays.split(',').map(day => parseInt(day.trim(), 10)),
                allDay: true
            };
    
            const recurringEvents = generateRecurringEvents(newEvent, endDate);
            setEvents([...events, ...recurringEvents]);
        }
    }

    const handleEventClick = (clickInfo) => {
        const deleteConfirmed = window.confirm(`Are you sure you want to delete the event "${clickInfo.event.title}"?`);
        if (deleteConfirmed) {
            const eventId = clickInfo.event.id;
            const updatedEvents = events.filter(event => {
                if (event.id === eventId) {
                    return false;
                } else if (event.recurring && event.recurring.parentId === eventId) {
                    return event.start.getTime() !== clickInfo.event.start.getTime();
                } else {
                    return true;
                }
            });
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

function generateRecurringEvents(originalEvent, endDate) {
    const { start } = originalEvent;
    const repeatDays = originalEvent.dow; // Days of week to repeat (e.g., [1, 3, 5] for Mon, Wed, Fri)
    const recurringEvents = [];

    let currentDate = new Date(start);
    const lastDate = new Date(endDate);

    // Ensure currentDate is set to the start of the day
    currentDate.setHours(0, 0, 0, 0);

    while (currentDate <= lastDate) {
        const dayOfWeek = currentDate.getDay(); // Get day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)

        if (repeatDays.includes(dayOfWeek)) {
            // Create a new event for the current date
            const recurringEvent = {
                ...originalEvent,
                id: generateUniqueId(), // Generate a unique ID for each recurring event
                start: new Date(currentDate), // Create a new Date instance
                title: originalEvent.title, // Optionally, modify other event properties
            };

            recurringEvents.push(recurringEvent);
        }

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return recurringEvents;
}