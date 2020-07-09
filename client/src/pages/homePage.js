import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import Card from "react-bootstrap/Card";
import "./style.css";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    displayAll();
    displayAllAnswers();
  }, []);

  const displayAll = () => {
    API.displayAllQuestions()
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const displayAllAnswers = () => {
    API.getAllAnswers()
      .then((res) => {
        setAnswers(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getAnswersSum = (questionId) => {
    return answers.filter((answer) => answer.questionId === questionId).length;
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
                    <div className="col-md-2 count">
                      Likes: {question.likes}
                    </div>
                    <div className="col-md-2 count">
                      Answers: {getAnswersSum(question.id)}
                    </div>
                    <Link
                      to={"/display-single-question/" + question.id}
                      className="col-md-6 question"
                    >
                      {question.title}
                    </Link>
                  </div>
                  <hr></hr>
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
