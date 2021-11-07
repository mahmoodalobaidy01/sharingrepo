import Login from "./pages/login";
import { Authcontext } from "./context/authcontext";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import Bookstore from "./pages/bookstore";
import Authors from "./pages/authors";

function App() {
  const { isAuth } = useContext(Authcontext);

  let routes;
  console.log(isAuth, 96969696);
  console.log(typeof localStorage.getItem("isauth"));
  if (
    localStorage.getItem("isauth") == "false" ||
    !localStorage.getItem("isauth")
  ) {
    routes = <Login />;
  } else if (localStorage.getItem("isauth") == "true") {
    localStorage.getItem("isadmin") == "true"
      ? (routes = (
          <Switch>
            <Route path="/authors">
              <Authors />
            </Route>
          </Switch>
        ))
      : //routes = <Authors />;
        (routes = (
          <Switch>
            <Route path="/authors">
              <Bookstore />
            </Route>
          </Switch>
        ));
  } else if (!isAuth) {
    routes = <Login />;
  }
  return <div className="App">{routes}</div>;
}

export default App;
