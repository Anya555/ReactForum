import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./style.css";
import API from "../../utils/API";

const PostQuestion = (props) => {
  const [formObject, setFormObject] = useState([]);
  const [shouldSave, setShouldSave] = useState(false);

  useEffect(() => {
    if (shouldSave === true) {
      addItemToDb();
    }
  }, [shouldSave]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormObject({ ...formObject, [name]: value });
  };

  const addItemToDb = () => {
    API.saveQuestionToDb(formObject)
      .then((res) => {
        console.log(res);
        props.history.replace("/");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormObject({ ...formObject, likes: 0, dislikes: 0, views: 0 });
    setShouldSave(true);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-sm-2 col-sm-12">
            <br></br>
            <br></br>
            <br></br>
            <Card className="card">
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="title">Title</Form.Label>
                  <Form.Text className="text-muted">
                    Be specific, so people can understand the issue you're
                    having
                  </Form.Text>
                  <Form.Control name="title" onChange={handleInputChange} />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label className="title">Body</Form.Label>
                  <Form.Text className="text-muted">
                    Include all the information someone would need to answer
                    your question. To add code blocks, wrap your code in 3
                    backticks like following example : ```location.pathname```
                  </Form.Text>
                  <Form.Control
                    as="textarea"
                    rows="7"
                    name="body"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>
              <Button
                variant="outline-info"
                className="post-question"
                onClick={handleSubmit}
              >
                Post Question
              </Button>
            </Card>
            <br></br>
          </div>
        </div>
      </div>
    </>
  );
};
export default withRouter(PostQuestion);
