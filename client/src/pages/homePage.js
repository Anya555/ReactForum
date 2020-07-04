import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import API from "../utils/API";
import Card from "react-bootstrap/Card";
import DisplaySingleQuestion from "../components/DisplaySingleQuestion";
import Button from "react-bootstrap/Button";
import "./style.css";

const Home = (props) => {
  const [showQuestionData, setShowQuestionData] = useState(false);

  useEffect(() => {
    displayAll();
  }, []);

  const displayAll = () => {
    API.displayAllQuestions()
      .then((res) => {
        console.log(res.data);
        props.setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  // const showQuestion = (questionToShow) => {
  //   const newQuestion = props.questions.map((question) => {
  //     if (question.id === questionToShow.id) {
  //       console.log(questionToShow);
  //       setShowQuestionData(true);
  //     }
  //     return question;
  //   });
  //   props.setQuestions(newQuestion);
  // };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-10 offset-sm-1 col-sm-12">
            <br></br> <br></br>
            <Card>
              {props.questions.map((question) => (
                <Card.Body key={question.id}>
                  <div className="row">
                    <div className="col-md-2 count">Votes:</div>
                    <div className="col-md-2 count">Answers:</div>
                    <Link
                      to="/display-single-question"
                      className="col-md-6 question"
                      onClick={() => props.showQuestion(question)}
                    >
                      {question.title}
                    </Link>
                  </div>
                  <hr></hr>
                  {/* {showQuestionData === true ? (
                    <DisplaySingleQuestion question={question} />
                  ) : null} */}
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
