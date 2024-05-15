import { RouterProvider } from "react-router-dom";
import router from "./route/Router";
import { UserContext } from "./context/userContext";
import { useEffect, useState } from "react";
import { LoggedInContext } from "./context/loggedInContext";
import { UserType } from "./types/user/UserType";

function MyApp() {
  const [userDetails, setUserDetails] = useState<UserType | undefined>(undefined);
  const [token, setToken] = useState(sessionStorage.getItem("token") || undefined);

  useEffect(() => {
    if (token) {
      async function getUserDetails() {
        try {
          const response = await fetch("http://localhost:3000/users/myuser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          });
          const { userDetails } = await response.json();

          if (response.ok) {
            setUserDetails(userDetails);
          } else {
            alert(userDetails.error);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
      getUserDetails();
    }
  }, [token]);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = sessionStorage.getItem("token");
      if (token !== token) {
        setToken(token || undefined);
      }
    }, 0);

    return () => clearInterval(interval);
  }, [token]);

  return (
    <>
      <LoggedInContext.Provider value={token}>
        <UserContext.Provider value={userDetails}>
          <RouterProvider router={router} />
        </UserContext.Provider>
      </LoggedInContext.Provider>
    </>
  );
}

export default MyApp;
