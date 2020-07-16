import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import Card from "react-bootstrap/Card";
import "./style.css";
import * as moment from "moment";

const Home = (props) => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    displayAll();
    displayAllAnswers();
  }, []);

  const displayAll = () => {
    API.displayAllQuestions()
      .then((res) => {
        setQuestions(res.data);
        setFilteredQuestions(res.data);
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
          <div className="col-md-8 offset-sm-2 col-sm-12">
            <br></br> <br></br>
            {filteredQuestions
              .filter(
                (question) =>
                  question.title
                    .toLowerCase()
                    .includes(props.search.toLowerCase()) ||
                  question.body
                    .toLowerCase()
                    .includes(props.search.toLowerCase())
              )
              .map((question) => (
                <Card.Body key={question.id}>
                  <div className="row">
                    <Link
                      to={"/display-single-question/" + question.id}
                      className="col-md-12 col-sm-12 question"
                    >
                      {question.title}
                    </Link>
                  </div>
                  <div className="row">
                    <div className="col-md-2 col-sm-12 count">
                      likes: {question.likes}
                    </div>
                    <div className="col-md-2 col-sm-12 count">
                      answers: {getAnswersSum(question.id)}
                    </div>
                    <div className="col-md-2 col-sm-12 count">
                      views: {question.views}
                    </div>
                    <div className="col-md-4 col-sm-12 asked count">
                      asked: {moment(question.createdAt).fromNow()}
                    </div>
                  </div>
                  <hr></hr>
                </Card.Body>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
