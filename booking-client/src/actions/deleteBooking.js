export const BOOKING_DELETING_PENDING = "BOOKING_DELETING_PENDING";
export const BOOKING_DELETING_SUCCESS = "BOOKING_DELETING_SUCCESS";
export const BOOKING_DELETING_ERROR = "BOOKING_DELETING_ERROR";

export const deleteBookingPending = () => {
  return { type: BOOKING_DELETING_PENDING };
};

export const deleteBookingSuccess = (id) => {
  return { type: BOOKING_DELETING_SUCCESS, id: id };
};

export const deleteBookingError = () => {
  return { type: BOOKING_DELETING_ERROR };
};
