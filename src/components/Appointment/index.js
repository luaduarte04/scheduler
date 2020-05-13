import React from "react"; //, { useState, Fragment }

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
// import Confirm from "components/Appointment/Confirm";
// import Status from "components/Appointment/Status";
// import Error from "components/Appointment/Error";
// import Form from "components/Appointment/Form";


export default function Appointment(props) {
  return (
    <article className="appointment">
        <Header time={props.time} />
        {props.interview ? <Show name={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />}
    </article>
  );
}

// bring props action for buttons ex: onClick={props.onEdit}