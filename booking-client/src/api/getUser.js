import {
  getUserPending,
  getUserError,
  getUserSuccess,
} from "../actions/getUser";

const getUser = (user) => {
  const requestOptions = {
    method: "GET",
  };

  return (dispatch) => {
    dispatch(getUserPending());
    fetch(`http://localhost:8080/booking/user/${user}`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(getUserSuccess(user, res));
      })
      .catch((error) => {
        dispatch(getUserError(error));
      });
  };
};
export default getUser;
