import {
  createBookingPending,
  createBookingError,
  createBookingSuccess,
} from "../actions/createBooking";

export const createBooking = (id, user, startDate, endDate) => {
  const requestOptions = {
    method: "POST",
  };
  const params = `?id=${id}&user=${user}&startDate=${startDate}&endDate=${endDate}`;

  return (dispatch) => {
    dispatch(createBookingPending());
    fetch("http://localhost:8080/booking/" + params, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(createBookingSuccess(res));
      })
      .catch((error) => {
        dispatch(createBookingError());
      });
  };
};
