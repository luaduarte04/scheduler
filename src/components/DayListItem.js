import React from "react";
import className from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  let spot = props.spots;

  const formatSpots = spot => {
    let spotsRemaining = '';

    if (props.spots === 0) {
      spotsRemaining = 'no spots remaining';
    } else if (props.spots === 1) {
      spotsRemaining += '1 spot remaining';
    } else if (props.spots > 1) {
      spotsRemaining += `${spot} spots remaining`;
    }

    return spotsRemaining;
  }

  const dayClass = className ("day-list__item", {
    "day-list__item--selected": props.selected === true,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li className={ dayClass } onClick={ props.setDay }>
      <h2>{props.name}</h2> 
      <h3>{formatSpots(spot)}</h3>
    </li>
  );
}