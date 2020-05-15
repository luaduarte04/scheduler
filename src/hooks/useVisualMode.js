import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  
  const transition = (mode, replace = false) => {
    setHistory (prev => {
      if (replace) {
        return [...prev.slice(0, prev.length - 1), mode];
      } else {
        return [...prev, mode];
      }
    })
  };

  const back = () => {
    if (history.length < 2) {
      return;
    } else {
      return setHistory(prev => [...prev.slice(0, history.length - 1)]);
    }
  };

  return { mode: history[history.length - 1], transition, back };
}