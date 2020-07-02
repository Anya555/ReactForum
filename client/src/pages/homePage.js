import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import Card from "react-bootstrap/Card";
import DisplaySingleQuestion from "../components/DisplaySingleQuestion";
import "./style.css";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [showQuestionData, setShowQuestionData] = useState(false);

  useEffect(() => {
    displayAll();
  }, []);

  const displayAll = () => {
    API.displayAllQuestions()
      .then((res) => {
        console.log(res.data);
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const showQuestion = (questionToShow) => {
    const newQuestion = questions.map((question) => {
      if (question.id === questionToShow.id) {
        console.log(question);
        setShowQuestionData(true);
      }
      return question;
    });
    setQuestions(newQuestion);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-sm-1 col-sm-12">
            <br></br> <br></br>
            <Card>
              {questions.map((question) => (
                <Card.Body key={question.id}>
                  <div className="row">
                    <div className="col-md-2 count">Votes:</div>
                    <div className="col-md-2 count">Answers:</div>
                    <Link
                      to="/display-single-question"
                      className="col-md-6 question"
                      onClick={() => showQuestion(question)}
                    >
                      {question.title}
                    </Link>
                  </div>
                  <hr></hr>
                  {showQuestionData === true ? (
                    <DisplaySingleQuestion
                      question={question}
                      questions={questions}
                      showQuestion={showQuestion}
                    />
                  ) : null}
                </Card.Body>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
