import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import "./style.css";

const Question = (props) => {
  console.log(props.question);
  console.log(props.questions);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-sm-2 col-sm-12">
            <br></br>
            {/* <h2>{props.question.title}</h2> */}
            <div className="row">
              <div className="col-md-2 likes">
                <AiOutlineLike />
              </div>
              <div className="col-md-2 likes">
                <AiOutlineDislike />
              </div>
            </div>
            <br></br>
            {/* <p>{props.question.body}</p>
            <p>{props.question.code}</p> */}
          </div>
        </div>
        {/* <div className="row">
          <div className="col-md-8 offset-sm-2 col-sm-12">
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label className="title">Your Answer</Form.Label>
              <Form.Control
                as="textarea"
                rows="11"
                // onChange={handleInputChange}
              />
            </Form.Group>
          </div>
        </div> */}
      </div>
    </>
  );
};
export default Question;
