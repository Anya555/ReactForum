import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "./style.css";

const Question = (props) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-sm-2 col-sm-12">
            <br></br>

            <h2>{props.questionData.title}</h2>
            <div className="row">
              <div className="col-md-2 likes">
                <AiOutlineLike />
              </div>
              <div className="col-md-2 likes">
                <AiOutlineDislike />
              </div>
            </div>
            <hr></hr>
            <br></br>
            <p>{props.questionData.body}</p>
            <Card className="code">{props.questionData.code}</Card>
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
