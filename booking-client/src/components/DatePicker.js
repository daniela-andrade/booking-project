import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useDispatch, useSelector } from "react-redux";

export const DatePicker = (props) => {
  const { id, startDate, endDate, submitLabel, onSubmit } = props;
  const user = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [start, setStart] = useState(startDate ? startDate : "");
  const [end, setEnd] = useState(endDate ? endDate : "");

  const getTodayString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${padDate(today.getMonth())}-${padDate(
      today.getDate()
    )}`;
  };

  const padDate = (date) => {
    return date.toString().padStart(2, "0");
  };

  const dispatch = useDispatch();

  const onSubmitForm = (event) => {
    event.preventDefault();
    setError(false);
    if (start && start !== "") {
      if (end && start > end) {
        setError("The Start Date can't be before the End Date");
      } else {
        dispatch(onSubmit(id ? id : uuidv4(), user, start, end ? end : start));
        setStart("");
        setEnd("");
      }
    } else {
      setError("The Start Date can't be empty");
    }
  };

  const handleStartChange = (event) => {
    event.preventDefault();
    setStart(event.target.value);
    setError(false);
  };

  const handleEndChange = (event) => {
    event.preventDefault();
    setEnd(event.target.value);
  };

  return (
    <div className="datePicker">
      <form onSubmit={onSubmitForm}>
        <input
          min={getTodayString()}
          type="date"
          id="startDate"
          value={start}
          onChange={handleStartChange}
        />
        {start ? (
          <input
            min={start}
            type="date"
            id="endDate"
            value={end ? end : start}
            onChange={handleEndChange}
            disabled={!start}
          />
        ) : null}
        {error ? <div className="message">{error}</div> : null}
        <input type="submit" value={submitLabel} className="button" />
      </form>{" "}
    </div>
  );
};
