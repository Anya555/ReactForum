import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import Card from "react-bootstrap/Card";
import * as moment from "moment";
import API from "../../utils/API";
import "./style.css";
import PostAnswer from "../PostAnswer";

const Question = () => {
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState({});
  let location = useLocation();

  useEffect(() => {
    // find question id
    let questionID = location.pathname.split("/")[2];
    findQuestionData(questionID);
  }, []);

  const findQuestionData = (id) => {
    API.findQuestion(id)
      .then((res) => {
        res.data.views += 1;
        API.updateQuestion(res.data)
          .then(() => {
            setQuestion(res.data);
            showAnswers(res.data.id);
          })
          .catch((err) => {
            console.log(err.response);
          });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const updateQuestion = (name) => {
    const questionDataCopy = { ...question };
    questionDataCopy[name] += 1;

    API.updateQuestion(questionDataCopy)
      .then(() => {
        setQuestion(questionDataCopy);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const updateAnswerLikesCount = (name, id) => {
    const answersDataCopy = [...answers];
    const answer = answersDataCopy.find((answer) => answer.id === id);
    answer[name] += 1;
    API.updateAnswerLikesQty(answer)
      .then(() => {
        setAnswers(answersDataCopy);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const showAnswers = (id) => {
    API.getAllAnswers()
      .then((res) => {
        const newAnswers = [];
        res.data.forEach((answer) => {
          if (answer.questionId === id) {
            newAnswers.push(answer);
          }
        });
        setAnswers(newAnswers);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-sm-2 col-sm-12">
            <br></br>

            <h2>{question.title}</h2>
            <div className="row">
              <div className="col-md-2 likes">
                <AiOutlineLike
                  className="likes-icon"
                  onClick={() => updateQuestion("likes")}
                />
                {question.likes}
              </div>
              <div className="col-md-2 likes">
                <AiOutlineDislike
                  className="likes-icon"
                  onClick={() => updateQuestion("dislikes")}
                />
                {question.dislikes}
              </div>
              <div className="asked">asked</div>
              {moment(question.createdAt).fromNow()}
              <div>Views:{question.views}</div>
            </div>
            <hr></hr>
            <br></br>
            <p>{question.body}</p>
            <div className="col-md-10">
              <Card className="code">{question.code}</Card>
            </div>
            <hr></hr>
            <br></br>

            {answers.map((answer) => {
              return (
                <div key={answer.id}>
                  <div className="answer">Answer:</div>
                  <div className="row">
                    <div className="col-md-2 likes">
                      <AiOutlineLike
                        className="likes-icon"
                        onClick={() =>
                          updateAnswerLikesCount("likes", answer.id)
                        }
                      />
                      {answer.likes}
                    </div>
                    <div className="col-md-2 likes">
                      <AiOutlineDislike
                        className="likes-icon"
                        onClick={() =>
                          updateAnswerLikesCount("dislikes", answer.id)
                        }
                      />
                      {answer.dislikes}
                    </div>
                    <div className="asked">answered</div>
                    {moment(answer.createdAt).fromNow()}
                  </div>
                  <hr></hr>
                  <p>{answer.body}</p>
                  <hr></hr>
                </div>
              );
            })}
            <PostAnswer
              question={question}
              answers={answers}
              setAnswers={setAnswers}
            />
          </div>
        </div>
        <br></br>
      </div>
    </>
  );
};
export default Question;
