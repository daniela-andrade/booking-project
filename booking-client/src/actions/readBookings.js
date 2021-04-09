export const BOOKINGS_READING_PENDING = "BOOKINGS_READING_PENDING";
export const BOOKINGS_READING_SUCCESS = "BOOKINGS_READING_SUCCESS";
export const BOOKINGS_READING_ERROR = "BOOKINGS_READING_ERROR";

export const readBookingsPending = () => {
  return { type: BOOKINGS_READING_PENDING };
};

export const readBookingsSuccess = (booking) => {
  return { type: BOOKINGS_READING_SUCCESS, booking: booking };
};

export const readBookingsError = (error) => {
  return { type: BOOKINGS_READING_ERROR, error: error };
};
