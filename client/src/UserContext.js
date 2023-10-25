import { createContext, useState } from "react";

export const userContext = createContext({});

const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});

  return (
    <userContext.Provider value={{ userInfo, setUserInfo }}>
      <div>{children}</div>;
    </userContext.Provider>
  );
};

export default UserContextProvider;
