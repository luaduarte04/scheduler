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
      setState((prev) => ({
        ...prev,
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
      const days = updateSpots(id, "removeSpot");
      setState({ ...state, appointments, days });
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios({
      url: `/api/appointments/${id}`,
      method: 'DELETE'
    })
    .then(result => {
      const days = updateSpots(id, "addSpot");
      setState({ ...state, appointments, days })
    })
  }

  function editInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview
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
      setState({ ...state, appointments });
    })
  }

  function updateSpots(appointmentId, addOrRemoveSpots) {
    const days = [... state.days];

    for (let day of days) {
      if(day.appointments.includes(appointmentId)) {
        if (addOrRemoveSpots === "removeSpot") {
          day.spots -= 1;
        } else if (addOrRemoveSpots === "addSpot") {
          day.spots += 1;
        }
      }
    }
    return days;
  }

  return { state, setDay, bookInterview, cancelInterview, editInterview };
}