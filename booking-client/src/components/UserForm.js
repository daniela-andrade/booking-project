import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import createUser from "../api/getUser";

export const UserForm = () => {
  const [user, setUser] = useState("");
  const pendingGettingUser = useSelector((state) => state.pendingGettingUser);
  const errorGettingUser = useSelector((state) => state.errorGettingUser);

  const onChange = (event) => {
    setUser(event.target.value);
  };

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createUser(user));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Hello, welcome!</h1>
        <p>Enter your name:</p>
        <input type="text" id="username" value={user} onChange={onChange} />
        <input type="submit" className="button" value="OK"></input>
      </form>
      {pendingGettingUser ? (
        <div className="message">Checking user</div>
      ) : null}
      {errorGettingUser ? (
        <div className="message">Error creating/getting</div>
      ) : null}
    </div>
  );
};
