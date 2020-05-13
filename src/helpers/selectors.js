import Appointment from "components/Appointment";

export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(selectedDay => selectedDay.name === day);

  if (filteredDay.length > 0) {
    let appointmentsForDay = [];
    for (let appointmentKey in state.appointments) {
      if (filteredDay[0].appointments.includes(state.appointments[appointmentKey].id))
      appointmentsForDay.push(state.appointments[appointmentKey]);
    }
    //console.log(appointmentsForDay);
    return appointmentsForDay;
  } else {
    return [];
  }
}

export function getInterview(state, interview) {
  for (let appointment in state.appointments) {
    console.log(appointment)
  }


  // i want to grab the interviwer id in the appointment object and compare with 
  // the interviwer id in the interviewrs object

  // once i done that i want to return an object with 2 keys, one with the student name and the other with the interviewrs info.

  // state is an object so i can access state.appointments, however i will not always have an interview, so i need to find a way to filter that.

  // if i have i want then to compare the interviewer id there with the id in interviews object
}

// interviewers: {
//   "1": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   },
//   "2": {
//     id: 2,
//     name: "Tori Malcolm",
//     avatar: "https://i.imgur.com/Nmx0Qxo.png"
//   }
// }

// The function should return a new object containing the interview data when we pass it an object that contains the interviewer.

// Otherwise, the function should return null. The object it returns should look like this:

// {  
//   "student": "Lydia Miller-Jones",
//   "interviewer": {  
//     "id": 1,
//     "name": "Sylvia Palmer",
//     "avatar": "https://i.imgur.com/LpaY82x.png"
//   }
// }