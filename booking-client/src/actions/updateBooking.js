export const BOOKING_UPDATING_STATE = "BOOKING_UPDATING_STATE";

export const updateBookingState = (id, user, startDate, endDate, state) => {
  return updateState(id, user, startDate, endDate, state);
};

export const updateState = (id, user, startDate, endDate, state) => {
  return {
    type: BOOKING_UPDATING_STATE,
    booking: {
      id: id,
      user: user,
      startDate: startDate,
      endDate: endDate,
      state: state,
    },
  };
};
