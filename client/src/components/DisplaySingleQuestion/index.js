import React, { useEffect, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import Card from "react-bootstrap/Card";
import * as moment from "moment";
import API from "../../utils/API";
import "./style.css";
import PostAnswer from "../PostAnswer";

const Question = (props) => {
  const [momentDate, setMomentDate] = useState("");
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    postDate();
    showAnswers();
  }, []);

  const postDate = () => {
    const date = moment(props.questionData.createdAt.split("T")[0]).fromNow();
    setMomentDate(date);
  };

  const updateLikesCount = () => {
    API.updateLikesQty(props.questionData.id, {
      likes: (props.questionData.likes += 1),
    })
      .then(() => {
        setLikesCount(likesCount + 1);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const showAnswers = () => {
    API.getAllAnswers()
      .then((res) => {
        const newAnswers = [];
        res.data.forEach((answer) => {
          if (answer.questionId === props.questionData.id) {
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

            <h2>{props.questionData.title}</h2>
            <div className="row">
              <div className="col-md-2 likes">
                <AiOutlineLike
                  className="likes-icon"
                  onClick={() => updateLikesCount()}
                />
                {likesCount}
              </div>
              <div className="col-md-2 likes">
                <AiOutlineDislike className="likes-icon" />
                {dislikesCount}
              </div>
              <div className="asked">asked</div>
              {momentDate}
            </div>
            <hr></hr>
            <br></br>
            <p>{props.questionData.body}</p>
            <Card className="code">{props.questionData.code}</Card>
            <hr></hr>
            <br></br>
            {answers.map((answer) => {
              return (
                <div key={answer.id}>
                  <p>{answer.body}</p>
                  <hr></hr>
                </div>
              );
            })}
            <PostAnswer questionData={props.questionData} />
          </div>
        </div>
        <br></br>
      </div>
    </>
  );
};
export default Question;
