import Login from "./pages/login";
import { Authcontext } from "./context/authcontext";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import Authors from "./pages/authors";

function App() {
  const { isAuth } = useContext(Authcontext);
  let routes;
  if (!isAuth) {
    routes = <Login />;
  } else {
    routes = (
      <Switch>
        <Route path="/authors">
          <Authors />
        </Route>
      </Switch>
    );
  }
  return <div className="App">{routes}</div>;
}

export default App;
