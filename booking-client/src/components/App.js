import "./App.css";
import { DatePicker } from "./DatePicker";
import { Booking } from "./Booking";
import { UserForm } from "./UserForm";

import { useDispatch, useSelector } from "react-redux";
import { deleteBooking, updateBooking, createBooking } from "../api/apis";
import { editBooking, cancelEditBooking } from "../actions/types";

export const App = () => {
  const successGettingUser = useSelector((state) => state.successGettingUser);
  const user = useSelector((state) => state.user);
  const bookings = useSelector((state) => state.bookings);
  const errorCreating = useSelector((state) => state.errorCreating);
  const errorReading = useSelector((state) => state.errorReading);
  const dispatch = useDispatch();

  const createBookings = () => {
    if (bookings) {
      return bookings.map((booking) => (
        <Booking
          key={booking.id}
          id={booking.id}
          startDate={booking.startDate}
          endDate={booking.endDate}
          state={booking.state}
          onBookingEdited={() =>
            dispatch(
              editBooking(booking.id, user, booking.startDate, booking.endDate)
            )
          }
          onBookingUpdated={updateBooking}
          onBookingDeleted={() => dispatch(deleteBooking(booking.id))}
          onCancelEdit={() =>
            dispatch(
              cancelEditBooking(
                booking.id,
                user,
                booking.startDate,
                booking.endDate
              )
            )
          }
        ></Booking>
      ));
    }
    return <div></div>;
  };

  return (
    <div className="App">
      {successGettingUser ? (
        <div>
          <DatePicker
            submitLabel={"Create Booking"}
            onSubmit={createBooking}
          ></DatePicker>
          {errorCreating ? (
            <div className="message">
              Error creating booking, please try with new datas
            </div>
          ) : null}
          <div>
            {errorReading ? (
              <div className="message">Error reading bookings</div>
            ) : (
              createBookings()
            )}
          </div>
        </div>
      ) : (
        <UserForm></UserForm>
      )}
    </div>
  );
};
