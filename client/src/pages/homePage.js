import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../utils/API";
import Card from "react-bootstrap/Card";
import "./style.css";

const Home = (props) => {
  useEffect(() => {
    displayAll();
  }, []);

  const displayAll = () => {
    API.displayAllQuestions()
      .then((res) => {
        props.setQuestions(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

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
                    <div className="col-md-2 count">
                      Likes: {question.likes}
                    </div>
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
