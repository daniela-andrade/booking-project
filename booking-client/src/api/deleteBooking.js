import {
  deleteBookingError,
  deleteBookingSuccess,
} from "../actions/deleteBooking";

export const deleteBooking = (id) => {
  const requestOptions = {
    method: "DELETE",
  };

  return (dispatch) => {
    fetch(`http://localhost:8080/booking/${id}`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.error) {
          throw res.error;
        }
        dispatch(deleteBookingSuccess(res.id));
      })
      .catch((error) => {
        dispatch(deleteBookingError(error));
      });
  };
};
