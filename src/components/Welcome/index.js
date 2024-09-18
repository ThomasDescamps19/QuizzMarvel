import React, { useContext, useState, useEffect } from "react";
import Logout from "../Logout";
import Quiz from "../Quiz";
import { FirebaseContext } from "../Firebase";
import { useNavigate } from "react-router-dom"; // Importation de useNavigate

const Welcome = () => {
  const navigate = useNavigate();
  const [userSession, setUserSession] = useState(null);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    let listener = firebase.auth.onAuthStateChanged((user) => {
      user ? setUserSession(user) : navigate("/");
    });

    return () => {
      listener();
    };
  }, []);

  return userSession === null ? (
    <>
      <div className="loader"></div>
      <p className="loaderText">...</p>
    </>
  ) : (
    <>
      <div className="quiz-bg">
        <div className="container">
          <Logout />
          <Quiz />
        </div>
      </div>
    </>
  );
};

export default Welcome;
