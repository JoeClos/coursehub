import { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_SN_API_URL_USERS,
          {
            auth: {
              username: import.meta.env.VITE_SN_USERNAME,
              password: import.meta.env.VITE_SN_PASSWORD,
            },
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );
        setUser(response.data.result);
        console.log(
          "🚀 ~ fetchUsers ~ response.data.result:",
          response.data.result
        );
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <p>{user.name}</p>
      {/* {users.map((user) => (
        <div key={user.sys_id}>
          <p>
            User Account Link:{" "}
            <a href={user.user_account.link}>{user.user_account.value}</a>
          </p>
        </div>
      ))} */}
    </div>
  );
};

export default Users;
