import { updateState } from "./updateBooking";
import * as bookingState from '../Constants'

export const editBooking = (id, user, startDate, endDate) => {
  return updateState(id, user, startDate, endDate, bookingState.EDITING)
};

export const cancelEditBooking = (id, user, startDate, endDate) => {
  return updateState(id, user, startDate, endDate, bookingState.ACTIVE)
};