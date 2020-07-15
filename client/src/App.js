import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/homePage";
import Navbar from "./components/Navbar";
import PostQuestion from "./components/PostQuestion";
import DisplaySingleQuestion from "./components/DisplaySingleQuestion";

function App() {
  const [search, setSearch] = useState("");
  return (
    <div>
      <Router>
        <Navbar search={search} setSearch={setSearch} />
        <Switch>
          <Route exact path="/">
            <HomePage search={search} setSearch={setSearch} />
          </Route>
          <Route exact path="/post-question">
            <PostQuestion />
          </Route>
          <Route exact path="/display-single-question/:id">
            <DisplaySingleQuestion />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
