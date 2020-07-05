import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./pages/homePage";
import Navbar from "./components/Navbar";
import PostQuestion from "./components/PostQuestion";
import DisplaySingleQuestion from "./components/DisplaySingleQuestion";

function App() {
  const [questions, setQuestions] = useState([]);
  const [questionData, setQuestionData] = useState({});

  const showQuestion = (questionToShow) => {
    questions.map((question) => {
      if (question.id === questionToShow.id) {
        setQuestionData(question);
      }
      return question;
    });
  };

  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <HomePage
              questions={questions}
              setQuestions={setQuestions}
              showQuestion={showQuestion}
            />
          </Route>
          <Route exact path="/post-question">
            <PostQuestion />
          </Route>
          <Route exact path="/display-single-question">
            <DisplaySingleQuestion
              questions={questions}
              questionData={questionData}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
