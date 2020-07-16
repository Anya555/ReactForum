import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import * as moment from "moment";
import API from "../../utils/API";
import "./style.css";
import PostAnswer from "../PostAnswer";
import ReactGA from "react-ga";
import Highlight from "react-highlight.js";
ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_NO);

const Question = () => {
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState({});
  let location = useLocation();
  let code = useRef(null);

  useEffect(() => {
    let questionID = location.pathname.split("/")[2];
    findQuestionData(questionID);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  const formatCode = (body) => {
    if (!body) {
      return;
    }
    return <>{getContent(body)}</>;
  };

  const getContent = (body) => {
    let content = [];
    let indices = getIndicesOf("```", body);
    console.log(indices, body);
    if (indices.length > 0) {
      for (let i = 0; i < indices.length; i = i + 2) {
        if (indices[i] === 0 || i !== 0) {
          console.log("if", i, indices[i], indices[i + 1], indices[i + 2]);
          content.push(
            <Highlight>
              {body.substring(indices[i] + 3, indices[i + 1])}
            </Highlight>
          );
          content.push(
            <p>{body.substring(indices[i + 1] + 3, indices[i + 2])}</p>
          );
        } else {
          console.log("else", i, indices[i], indices[i + 1], indices[i + 2]);
          content.push(<p>{body.substring(0, indices[i])}</p>);
          content.push(
            <Highlight>
              {body.substring(indices[i] + 3, indices[i + 1])}
            </Highlight>
          );
          content.push(
            <p>{body.substring(indices[i + 1] + 3, indices[i + 2])}</p>
          );
        }
      }
    } else {
      content.push(<p>{body}</p>);
    }
    return content;
  };

  const getIndicesOf = (searchStr, str) => {
    let searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
      return [];
    }
    let startIndex = 0,
      index,
      indices = [];

    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      indices.push(index);
      startIndex = index + searchStrLen;
    }
    return indices;
  };

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
              <div className="col-md-1 likes">
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
              <div className="col-md-3 col-sm-12 asked">
                asked: {moment(question.createdAt).fromNow()}
              </div>
              <div className="col-md-2">views: {question.views}</div>
            </div>
            <hr></hr>
            <br></br>
            {formatCode(question.body)}
            <hr></hr>
            <br></br>
            {answers.map((answer) => {
              return (
                <div key={answer.id}>
                  <div className="answer">Answer:</div>
                  <div className="row">
                    <div className="col-md-1 likes">
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
                    <div className="col-md-4 col-sm-12 asked">
                      answered: {moment(answer.createdAt).fromNow()}
                    </div>
                  </div>
                  <hr></hr>
                  {formatCode(answer.body)}
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
