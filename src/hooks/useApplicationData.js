import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({...state, day});

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    })
    
  }, []);


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios({
      url: `/api/appointments/${id}`,
      method: 'PUT',
      data: appointment
    })
    .then(result => {
      setState({ ...state, appointments })
    })
    //.catch(err => err)
  }

  function cancelInterview(id) {

    return axios({
      url: `/api/appointments/${id}`,
      method: 'DELETE'
    })
    .then(result => {
      console.log('i got deleted');
    })
    //.catch(err => console.log(err))
  }

  return { state, setDay, bookInterview, cancelInterview };
}