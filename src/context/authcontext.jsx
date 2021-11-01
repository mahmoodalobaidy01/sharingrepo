import { createContext, useState, useEffect } from "react";
export const Authcontext = createContext({});

const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  const login = async (user) => {
    setUser(user);
    setIsAuth(true);
    await localStorage.setItem("user", JSON.stringify(user));
  };
  const logout = () => {
    setIsAuth(false);
    setUser({});
    localStorage.removeItem("user");
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(user);
  });
  return (
    <Authcontext.Provider value={{ login, logout, isAuth, user }}>
      {props.children}
    </Authcontext.Provider>
  );
};
export default AuthProvider;
