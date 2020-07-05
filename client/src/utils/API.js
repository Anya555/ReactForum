import axios from "axios";

export default {
  saveQuestionToDb: (question) => {
    return axios.post("/api/questions", question);
  },

  displayAllQuestions: () => {
    return axios.get("/api/questions");
  },

  updateLikesQty: (id, quantity) => {
    console.log("api route hit");
    console.log(id);
    console.log(quantity);
    return axios.put("/api/questions/" + id, quantity);
  },

  postAnswer: (answer) => {
    console.log("api route hit");
    console.log(answer);
    return axios.post("/api/answers", answer);
  },
};
