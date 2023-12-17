import { createContext, useState } from "react";

export const UserContext = createContext({
  user: {},
  setUser: () => {}
});


export const UserProvider = ({ children }) => {
  const [ user, setUser ] = useState(null);

  const contextValue = {
    user,
    setUser
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
