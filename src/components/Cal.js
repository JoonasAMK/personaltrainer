import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import Home from './Home';

const localizer = momentLocalizer(moment)
function Cal() {
    moment.locale("en");
    const [events, setEvents] = useState([]);
    const [calEvents, setCalEvents] = useState([])

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setEvents(data))
        
       }
       

        return (
          <div>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
            />
          </div>
        );
      }
    
export default Cal;