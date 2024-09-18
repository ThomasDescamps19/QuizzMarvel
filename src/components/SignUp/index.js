import React, { useContext, useState } from "react";
import { FirebaseContext } from "../Firebase";
import { Link, useNavigate } from "react-router-dom"; // Importation de useNavigate

const Signup = () => {
  const firebase = useContext(FirebaseContext);
  const navigate = useNavigate(); // Utilisation de useNavigate pour la redirection

  const data = {
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [loginData, setloginData] = useState(data);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setloginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    firebase
      .signupUser(email, password)
      .then((user) => {
        setloginData({ ...data });
        navigate("/welcome"); // Utilisation de navigate pour rediriger
      })
      .catch((error) => {
        setError(error);
        setloginData({ ...data });
      });
  };

  const { pseudo, email, password, confirmPassword } = loginData;

  const btn =
    pseudo === "" ||
    email === "" ||
    password === "" ||
    password !== confirmPassword ? (
      <button disabled>Inscription</button>
    ) : (
      <button>Inscription</button>
    );

  // gestion erreurs
  const errorMsg = error !== "" && <span>{error.message}</span>;

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftSignup"></div>
        <div className="formBoxRight">
          <div className="formContent">
            {errorMsg}
            <h2>Inscription</h2>
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  value={pseudo}
                  onChange={handleChange}
                  type="text"
                  id="pseudo"
                  autoComplete="off"
                  required
                />
                <label htmlFor="pseudo">Pseudo</label>
              </div>
              <div className="inputBox">
                <input
                  value={email}
                  onChange={handleChange}
                  type="email"
                  id="email"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input
                  value={password}
                  onChange={handleChange}
                  type="password"
                  id="password"
                  autoComplete="off"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>
              <div className="inputBox">
                <input
                  value={confirmPassword}
                  onChange={handleChange}
                  type="password"
                  id="confirmPassword"
                  autoComplete="off"
                  required
                />
                <label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </label>
              </div>
              {btn}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/login">
                Déjà inscrit ? Connectez-vous.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
