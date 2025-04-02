import React, { useState } from "react";
import axios from "axios";
import useAsync from "./useAsync";
import User from "./User";

async function getUsers() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
}

const Users = () => {
  const [state, refetch] = useAsync(getUsers, [], true);
  const [userId, setUserId] = useState(null);
  const { loading, error, data: users } = state;
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>에러 발생</p>;
  }
  if (!users) {
    return <button onClick={refetch}>불러오기</button>;
  }

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id} onClick={() => setUserId(user.id)}>
            ({user.username}) {user.name}
          </li>
        ))}
      </ul>
      <button onClick={refetch}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
};

export default Users;
