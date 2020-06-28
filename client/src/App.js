import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/homePage";
import Navbar from "./components/Navbar";
import PostQuestion from "./components/PostQuestion";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/post-question">
            <PostQuestion />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
