import React, { useState } from "react"; //, { useState, Fragment }

import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
//import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";
import Status from "./Status";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CONFIRM = "CONFIRM";
const ERROR = "ERROR";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(error => transition(ERROR_SAVE, true));
  }

  function destroy(event) {
    transition(DELETING, true);
    props
     .cancelInterview(props.id)
     .then(() => transition(EMPTY))
     .catch(error => transition(ERROR_DELETE, true));
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={ () => {transition(CREATE)} } />}

      {mode === SAVING ? <Status message="Saving" /> : null }
      {mode === DELETING ? <Status message="Deleting" /> : null }
      {mode === CONFIRM &&
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={ () => back(SHOW) }
          onConfirm={ destroy }
        />
      }

      { mode === ERROR_DELETE &&
        <Error
          message="Could not cancel appointment."
          onClose={ () => back(SHOW) }
        />
      }

      {mode === SHOW ?
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={ () => transition(EDIT) }
        onDelete={ () => {transition(CONFIRM)} }
        /> : null
      }
      
      {mode === EDIT &&
        <Form
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          name={ props.interview.student }
          onCancel={ () => back(SHOW) }
          onSave={ save }
        />
      }
      
      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={ () => back(EMPTY) }
          onSave={ save }
        />
      }
    </article>
  );
}


// update spots
// check if all props are working (compare with storybook)
// SAVE ERROR
// as soon as it loads it should go for the monday no?!