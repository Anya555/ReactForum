import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import * as moment from "moment";
import API from "../../utils/API";
import "./style.css";
import PostAnswer from "../PostAnswer";
import Highlight from "react-highlight.js";

const Question = () => {
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState({});
  let location = useLocation();

  useEffect(() => {
    let questionID = location.pathname.split("/")[2];
    findQuestionData(questionID);
  }, []);

  const getContent = (body) => {
    if (!body) {
      return;
    }
    let content = [];
    let codeIndices = getIndicesOf("```", body);
    if (codeIndices.length > 0) {
      for (let i = 0; i < codeIndices.length; i = i + 2) {
        if (codeIndices[i] === 0 || i !== 0) {
          // console.log("if", i, codeIndices[i], codeIndices[i + 1], codeIndices[i + 2]);
          content.push(
            <Highlight>
              {body.substring(codeIndices[i] + 3, codeIndices[i + 1])}
            </Highlight>
          );
          let text = body.substring(codeIndices[i + 1] + 3, codeIndices[i + 2]);
          content.push(generateBody(text));
        } else {
          // console.log("else", i, codeIndices[i], codeIndices[i + 1], codeIndices[i + 2]);
          let text = body.substring(0, codeIndices[i]);
          content.push(generateBody(text));
          content.push(
            <Highlight>
              {body.substring(codeIndices[i] + 3, codeIndices[i + 1])}
            </Highlight>
          );
          text = body.substring(codeIndices[i + 1] + 3, codeIndices[i + 2]);
          content.push(generateBody(text));
        }
      }
    } else {
      content.push(<p>{body}</p>);
    }
    return content;
  };

  const generateBody = (text) => {
    let linkIndices = [];
    let content = [];
    // identifies all links 
    let links = text.match(
      /(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
    );

    if (links) {
      links.forEach((link) => {
        linkIndices.push(text.indexOf(link));
      });
      console.log(linkIndices);
      linkIndices.forEach((linkIndex, j) => {
        console.log(text[0]);
        if (linkIndex === 0 || j !== 0) {
          let firstText = text.substring(
            linkIndex + links[j].length,
            linkIndices[j + 1]
          );
          let firstLink = text.substring(
            linkIndex,
            linkIndex + links[j].length
          );
          content.push(
            <a href={firstLink} target="_blank" rel="noopener noreferrer">
              {firstLink}
            </a>
          );
          content.push(<p>{firstText}</p>);
        } else {
          let firstText = text.substring(0, linkIndex);
          let firstLink = text.substring(
            linkIndex,
            linkIndex + links[j].length
          );
          let secondText = text.substring(
            linkIndex + links[j].length,
            linkIndices[j + 1]
          );
          content.push(<p>{firstText}</p>);
          content.push(
            <a href={firstLink} target="_blank" rel="noopener noreferrer">
              {firstLink}
            </a>
          );
          content.push(<p>{secondText}</p>);
        }
      });
    } else {
      content.push(<p>{text}</p>);
    }
    return content;
  };

  // get codeIndices of all code occurrences
  const getIndicesOf = (searchStr, str) => {
    let searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
      return [];
    }
    let startIndex = 0,
      index,
      codeIndices = [];

    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
      codeIndices.push(index);
      startIndex = index + searchStrLen;
    }
    return codeIndices;
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
          <div className="col-md-8 offset-sm-2 col-sm-12" key={question.id}>
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
              <div className="col-md-4 col-sm-12 asked">
                asked: {moment(question.createdAt).fromNow()}
              </div>
              <div className="col-md-2">views: {question.views}</div>
            </div>
            <hr></hr>
            <br></br>
            {getContent(question.body)}
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
                  {getContent(answer.body)}
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
