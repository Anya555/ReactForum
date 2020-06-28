import axios from "axios";

export default {
  saveQuestionToDb: (question) => {
    console.log("api route hit");
    console.log(question);
    return axios.post("/api/questions", question);
  },
};
