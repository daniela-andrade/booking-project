import { updateBookingState } from "../actions/updateBooking";

export const updateBooking = (id, user, startDate, endDate, state) => {
  const requestOptions = {
    method: "PUT",
  };

  const params = `?id=${id}&user=${user}&startDate=${startDate}&endDate=${endDate}&state=${state}`;

  return (dispatch) => {
    fetch("http://localhost:8080/booking/" + params, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(updateBookingState(id, user, res.startDate, res.endDate, res.state));
      })
      .catch((error) => {
        console.log(error);
        dispatch(
          updateBookingState(id, user, startDate, endDate, "ERROR_UPDATING")
        );
      });
  };
};
