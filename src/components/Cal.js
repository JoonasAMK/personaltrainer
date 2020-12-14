import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import Home from './Home';
import axios from "axios";

const localizer = momentLocalizer(moment)
function Cal() {
    
    const [events, setEvents] = useState([]);
    const [calEvents, setCalEvents] = useState([])

    useEffect(() => fetchData(), []);

    
       const fetchData = () => {
        axios
          .get("https://customerrest.herokuapp.com/gettrainings")
          .then(function(response) {
            response.data.map(event => {
              calEvents.push({
                start: new Date(moment.utc(event.date).format("ll LT")),
                end: new Date(
                  moment
                    .utc(event.date)
                    .add(event.duration, "minutes")
                    .format("ll LT")
                ),
                title:
                  event.activity +
                  " / " +
                  event.customer.firstname +
                  " " +
                  event.customer.lastname
              });
            });
            setEvents(calEvents);
            console.log(calEvents);
           });
      };
       

        return (
          <div>
            <Calendar 
              localizer={localizer}
              events={calEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
             />
          </div>
        );
      }
    
export default Cal;