import React from "react";
import className from "classnames";

import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  //console.log(props.selected);
  const selectedInterviewer = props.selected;
  let interviewerName = "";

  if (selectedInterviewer) {
    interviewerName = props.name;
  }

  const interviewerListItemClass = className ("interviewers__item", {
    "interviewers__item--selected": props.selected === true,
  });

  const interviewerListItemImgClass = className ("interviewers__item-image", {
    "interviewers__item--selected-image": props.avatar
  });

  return (
    <li className={ interviewerListItemClass } onClick={ props.onChange }>
      <img
        className={ interviewerListItemImgClass }
        src={ props.avatar }
        alt={ props.name }
      />
      { interviewerName }
    </li>
  );
}