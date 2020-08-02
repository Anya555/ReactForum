import axios from "axios";

export default {
  saveQuestionToDb: (question) => {
    console.log(question);
    return axios.post("/api/questions", question);
  },

  displayAllQuestions: () => {
    return axios.get("/api/questions");
  },

  updateQuestion: (question) => {
    return axios.put("/api/questions/" + question.id, question);
  },

  updateAnswerLikesQty: (answer) => {
    return axios.put("/api/answers/" + answer.id, answer);
  },

  postAnswer: (answer) => {
    return axios.post("/api/answers", answer);
  },

  getAllAnswers: () => {
    return axios.get("/api/answers");
  },

  findQuestion: (id) => {
    return axios.get("/api/questions/" + id);
  },
};
