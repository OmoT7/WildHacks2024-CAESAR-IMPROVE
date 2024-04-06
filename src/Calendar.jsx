import React from "react";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin! 


function Calendar(){
    return( 
    <div>Classes
    <FullCalendar
    plugins={[ dayGridPlugin ]}
    initialView="dayGridMonth"/>

    events={[
    { title: 'event 1', date: '2024-04-04' },
    { title: 'event 2', date: '2024-04-04' }
    ]}
    </div>
    )
}
export default Calendar