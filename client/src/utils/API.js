import axios from "axios";

export default {
  saveQuestionToDb: (question) => {
    return axios.post("/api/questions", question);
  },

  displayAllQuestions: () => {
    console.log("api route hit");
    return axios.get("/api/questions");
  },
};
