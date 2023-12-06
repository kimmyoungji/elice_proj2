import { createContext, useReducer } from "react";
import LoginReducer from "./LoginReducer";

let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : "";

export const UserStateContext = createContext(user);
export const UserDispatchContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(LoginReducer, user);

  return (
    <UserStateContext.Provider value={userState}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};
