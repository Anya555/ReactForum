import axios from "axios";

export default {
  saveQuestionToDb: (question) => {
    return axios.post("/api/questions", question);
  },

  displayAllQuestions: () => {
    return axios.get("/api/questions");
  },

  
};
