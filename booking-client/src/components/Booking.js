import React from "react";
import { DatePicker } from "./DatePicker";

export class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.startDate,
      endDate: this.props.endDate,
    };
  }

  render() {
    const {
      id,
      startDate,
      endDate,
      onBookingDeleted,
      onBookingUpdated,
      state,
      onBookingEdited,
      onCancelEdit,
    } = this.props;

    return (
      <div className="bookingContainer">
        {state === "EDITING" || state === "ERROR_UPDATING" ? (
          <div>
            <div className="dateRange">
              <DatePicker
                startDate={startDate}
                endDate={endDate}
                submitLabel={"Update Booking"}
                onSubmit={onBookingUpdated}
                id={id}
              ></DatePicker>
            </div>
            <button className="button" onClick={onCancelEdit}>
              Cancel Edit
            </button>
            {state === "ERROR_UPDATING" ? (
              <div className="message">Error Updating, select other dates</div>
            ) : null}{" "}
          </div>
        ) : (
          <div>
            <div className="message">From: {startDate}</div>
            {endDate ? <div className="message">To: {endDate}</div> : null}
            <button className="button" onClick={onBookingEdited}>
              Edit Booking
            </button>
          </div>
        )}
        <button className="button" onClick={onBookingDeleted}>
          Cancel Booking
        </button>
      </div>
    );
  }
}
