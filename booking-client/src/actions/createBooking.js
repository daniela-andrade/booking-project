export const BOOKING_CREATING_PENDING = "BOOKING_CREATING_PENDING";
export const BOOKING_CREATING_SUCCESS = "BOOKING_CREATING_SUCCESS";
export const BOOKING_CREATING_ERROR = "BOOKING_CREATING_ERROR";

export const createBookingPending = () => {
  return { type: BOOKING_CREATING_PENDING };
};

export const createBookingSuccess = (booking) => {
  return { type: BOOKING_CREATING_SUCCESS, booking: booking };
};

export const createBookingError = () => {
  return { type: BOOKING_CREATING_ERROR };
};
