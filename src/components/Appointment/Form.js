import React, { useState } from "react";

import "components/Appointment/styles.scss";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const resetForm = () => {
    setName("");
    setInterviewer(null);
  }

  const cancel = () => {
    resetForm();
    props.onCancel();
  }

  const save = () => {
    if (name && interviewer) {
      props.onSave(name, interviewer);
    } else if (!name && interviewer) {
      props.onSave("", null);
    } else {
      props.onSave();
    }
  }
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input 
            className="appointment__create-input text--semi-bold"
            name="name" 
            value={ name }
            onChange={ event => setName(event.target.value) }
            type="text"
            placeholder="Enter Student Name"
            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          {/* <Button danger onClick={cancel}>Cancel</Button> */}
          <Button danger onClick={props.onCancel}>Cancel</Button>
          <Button confirm onClick={save}>Save</Button>
        </section>
      </section>
    </main>
  );
}