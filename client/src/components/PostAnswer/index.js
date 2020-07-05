import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import API from "../../utils/API";

const Answer = (props) => {
  const [formObject, setFormObject] = useState([]);
  const [shouldSave, setShouldSave] = useState(false);

  useEffect(() => {
    if (shouldSave === true) {
      addAnswerToDb();
    }
  }, [shouldSave]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormObject({ ...formObject, [name]: value });
  };

  const addAnswerToDb = () => {
    API.postAnswer(formObject)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormObject({
      ...formObject,
      likes: 0,
      dislikes: 0,
      questionId: props.questionData.id,
    });
    setShouldSave(true);
  };

  return (
    <>
      <Form>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label className="title">Your Answer</Form.Label>
          <Form.Text className="text-muted"></Form.Text>
          <Form.Control
            as="textarea"
            rows="11"
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
        Post Answer
      </Button>
    </>
  );
};
export default Answer;
