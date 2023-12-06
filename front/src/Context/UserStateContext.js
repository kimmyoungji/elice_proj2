import { createContext, useReducer } from "react";
import LoginReducer from "./LoginReducer";

// let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : "";
let user = document.cookie ? JSON.parse(document.cookie.split("=")[1]) : "";

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
