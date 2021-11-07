import { createContext, useState, useEffect } from "react";
export const Authcontext = createContext({});

const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = useState(Boolean);
  const [user, setUser] = useState({});
  // localStorage.setItem("isauth", JSON.stringify(isAuth));

  const login = async (user) => {
    setUser(user);
    console.log("inlogin");
    setIsAuth(true);

    await localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isauth", JSON.stringify(true));
  };

  const logout = () => {
    setIsAuth(false);
    setUser({});
    localStorage.removeItem("user");
    localStorage.removeItem("isauth");
    localStorage.removeItem("isadmin");
  };
  useEffect(() => {
    console.log(isAuth, 88888);
    const user = localStorage.getItem("user");
    setUser(user);
    // localStorage.removeItem("isauth");

    //localStorage.setItem("isauth", JSON.stringify(isAuth));
    setIsAuth(false);
    //isAuth ? setIsAuth(true) : setIsAuth(false);
  }, [setIsAuth]);
  return (
    <Authcontext.Provider value={{ login, logout, isAuth, user, setIsAuth }}>
      {props.children}
    </Authcontext.Provider>
  );
};
export default AuthProvider;
