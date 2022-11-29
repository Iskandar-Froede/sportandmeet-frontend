import { createContext, useEffect, useState } from "react";
//import { useLocalStorage } from "@mantine/hooks";

export const SessionContext = createContext();

const SessionContextProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  // const [token, setToken] = useLocalStorage({
  //   key: "token",
  //  defaultValue: undefined,
  // });
  const [user, setUser] = useState();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const verifyToken = async () => {
    const token1 = localStorage.getItem("authToken");
    console.log(token1);
    const response = await fetch("http://localhost:5005/auth/verify", {
      headers: {
        Authorization: `Bearer ${token1}`,
      },
    });
    const parsed = await response.json();
    console.log("here come", parsed);
    if (parsed.message === "Token OK") {
      setIsAuthenticated(true);
      setUser(parsed.payload.user);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const fetchWithToken =
    (method, endpoint, callback, body = null) =>
    async () => {
      const response = await fetch(`http://localhost:5005/${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body,
      });
      const parsed = await response.json();

      callback(parsed);
    };

  return (
    <SessionContext.Provider
      value={{
        token,
        setToken,
        isAuthenticated,
        fetchWithToken,
        user,
        setUser,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
