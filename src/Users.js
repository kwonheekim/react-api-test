import React, { useState } from "react";
import axios from "axios";
import { useAsync } from "react-async";
import User from "./User";

async function getUsers() {
  console.log("getUsers");
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  console.log("응답", response.data);
  return response.data;
}

const Users = () => {
  const [userId, setUserId] = useState(null);

  const {
    data: users,
    error,
    isPending,
    reload,
    run,
  } = useAsync({ promiseFn: getUsers });

  if (isPending) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>에러 발생</p>;
  }
  if (!users) {
    return <button onClick={run}>불러오기</button>;
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
      <button onClick={reload}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
};

export default Users;
