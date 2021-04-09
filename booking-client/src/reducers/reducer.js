import * as types from "../actions/types";

const initialState = {
  user: "",
  bookings: [],
  bookedDates: null,

  pendingCreating: false,
  successCreating: false,
  errorCreating: false,

  pendingReading: false,
  successReading: false,
  errorReading: false,

  pendingGettingUser: false,
  successGettingUser: false,
  errorGettingUser: false,
};

const updateBookingState = (state, booking) => {
  const newBookings = [...state.bookings].filter((b) => b.id !== booking.id);
  newBookings.push(booking);
  return newBookings;
};

const addBooking = (state, booking) => {
  const newBookings = [...state.bookings];
  newBookings.push(booking);
  return newBookings;
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    // GETTING USER
    case types.USER_GETTING_PENDING:
      return {
        ...state,
        pendingGettingUser: true,
      };
    case types.USER_GETTING_ERROR:
      return {
        ...state,
        errorGettingUser: true,
        pendingGettingUser: false,
      };
    case types.USER_GETTING_SUCCESS:
      return {
        ...state,
        pendingGettingUser: false,
        successGettingUser: true,
        bookings: action.bookings,
        user: action.user,
      };

    // CREATING BOOKING
    case types.BOOKING_CREATING_PENDING:
      return {
        ...state,
        pendingCreating: true,
      };
    case types.BOOKING_CREATING_ERROR:
      return {
        ...state,
        pendingCreating: false,
        errorCreating: true,
      };
    case types.BOOKING_CREATING_SUCCESS:
      return {
        ...state,
        pendingCreating: false,
        successCreating: true,
        errorCreating: false,
        bookings: addBooking(state, action.booking),
      };

    // READING BOOKINGS
    case types.BOOKINGS_READING_PENDING:
      return {
        ...state,
        pendingReading: true,
      };
    case types.BOOKINGS_READING_ERROR:
      return {
        ...state,
        errorReading: true,
        pendingReading: false,
      };
    case types.BOOKINGS_READING_SUCCESS:
      return {
        ...state,
        pendingReading: false,
        successReading: true,
        errorReading: false,
        bookings: action.bookings,
      };

    // UPDATING BOOKING
    case types.BOOKING_UPDATING_STATE:
      return {
        ...state,
        bookings: updateBookingState(state, action.booking),
      };

    // DELETING BOOKING
    case types.BOOKING_DELETING_SUCCESS:
      return {
        ...state,
        bookings: [...state.bookings].filter(
          (booking) => booking.id !== action.id
        ),
      };

    default:
      return state;
  }
}
