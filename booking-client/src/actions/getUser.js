export const USER_GETTING_PENDING = "USER_GETTING_PENDING";
export const USER_GETTING_SUCCESS = "USER_GETTING_SUCCESS";
export const USER_GETTING_ERROR = "USER_GETTING_ERROR";

export const getUserPending = () => {
  return { type: USER_GETTING_PENDING };
};

export const getUserSuccess = (user, bookings) => {
  return {
    type: USER_GETTING_SUCCESS,
    user: user,
    bookings: bookings,
  };
};

export const getUserError = (error) => {
  return { type: USER_GETTING_ERROR };
};
