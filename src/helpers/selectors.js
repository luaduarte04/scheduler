import Appointment from "components/Appointment";

export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(selectedDay => selectedDay.name === day);

  if (filteredDay.length > 0) {
    let appointmentsForDay = [];
    for (let appointmentKey in state.appointments) {
      if (filteredDay[0].appointments.includes(state.appointments[appointmentKey].id))
      appointmentsForDay.push(state.appointments[appointmentKey]);
    }
    return appointmentsForDay;
  } else {
    return [];
  }
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    return { student: interview.student, interviewer: state.interviewers[interview.interviewer] }
  }
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter(selectedDay => selectedDay.name === day);

  if (filteredDay.length > 0) {
    let interviewsForDay = [];
    for (let interviewKey in state.interviewers) {
      if (filteredDay[0].interviewers.includes(state.interviewers[interviewKey].id))
      interviewsForDay.push(state.interviewers[interviewKey]);
    }
    return interviewsForDay;
  } else {
    return [];
  }
}