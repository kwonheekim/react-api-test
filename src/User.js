import React from "react";
import axios from "axios";
import useAsync from "./useAsync";

const getUser = async (id) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
};

const User = ({ id }) => {
  const [state, refetch] = useAsync(() => getUser(id), [id]);
  const { loading, error, data: user } = state;
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>에러 발생</p>;
  }
  if (!user) {
    return null;
  }
  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email : </b> {user.email}
      </p>
    </div>
  );
};

export default User;
