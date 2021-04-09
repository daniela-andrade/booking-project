import {
  readBookingsPending,
  readBookingsError,
  readBookingsSuccess,
} from "../actions/readBookings";

const readBookings = (user) => {
  const requestOptions = {
    method: "GET",
  };

  return (dispatch) => {
    dispatch(readBookingsPending());
    fetch("http://localhost:8080/booking/" + user, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(readBookingsSuccess(res));
      })
      .catch((error) => {
        dispatch(readBookingsError(error));
      });
  };
};
export default readBookings;
