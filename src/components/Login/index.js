import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importation de useNavigate
import { FirebaseContext } from "../Firebase";

const Login = () => {
  const firebase = useContext(FirebaseContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (password.length > 5 && email !== "") {
      setBtn(true);
    } else if (btn === true) {
      setBtn(false);
    }
  }, [password, email, btn]);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .loginUser(email, password)
      .then((user) => {
        setEmail("");
        setPassword("");
        navigate("/welcome");
      })
      .catch((error) => {
        setEmail(error);
        setPassword("");
        setError("");
      });
  };

  return (
    <div className="signUpLoginBox">
      <div className="slContainer">
        <div className="formBoxLeftLogin"></div>
        <div className="formBoxRight">
          <div className="formContent">
            <h2>Connexion</h2>
            {error !== "" && <span>{error.message}</span>}
            <form onSubmit={handleSubmit}>
              <div className="inputBox">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="inputBox">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="off"
                  required
                />
                <label htmlFor="password">Mot de passe</label>
              </div>
              {btn ? (
                <button>Connexion</button>
              ) : (
                <button disabled>Connexion</button>
              )}
            </form>
            <div className="linkContainer">
              <Link className="simpleLink" to="/signup">
                Nouveau sur marvel quiz ? Inscrivez-vous maintenant.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
