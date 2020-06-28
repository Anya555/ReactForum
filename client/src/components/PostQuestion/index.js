import React from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./style.css";

const PostQuestion = () => {
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
                  <Form.Control name="title" />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label className="title">Body</Form.Label>
                  <Form.Text className="text-muted">
                    Include all the information someone would need to answer
                    your question
                  </Form.Text>
                  <Form.Control as="textarea" rows="11" />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label className="title">Code</Form.Label>
                  <Form.Text className="text-muted">
                    Add your code here
                  </Form.Text>
                  <Form.Control as="textarea" rows="6" />
                </Form.Group>
              </Form>
              <Button variant="outline-info" className="post-question">
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
export default PostQuestion;
