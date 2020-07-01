import React, { useEffect } from "react";
import API from "../utils/API";
const Home = () => {
  useEffect(() => {
    displayAll();
  }, []);

  const displayAll = () => {
    API.displayAllQuestions()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12"></div>
        </div>
      </div>
    </>
  );
};

export default Home;
