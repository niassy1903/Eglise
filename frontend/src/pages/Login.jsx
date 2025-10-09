import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";
import "../css/login.css";
import logoEglise from "../assets/eglise-logo.jpg"; // 👈 image ronde d'église

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login(email, motDePasse);
      const { utilisateur, token } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("utilisateur", JSON.stringify(utilisateur));

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Email ou mot de passe incorrect !");
    }
  };

  return (
    <div className="login-page"> {/* 👈 fond visible uniquement ici */}
      <div className="login-container">
        <div className="login-card">
          <div className="login-left d-none d-md-flex flex-column align-items-center justify-content-center">
            <h1>Bienvenue</h1>
            <h2>Dans votre espace paroissial</h2>
            <p>Connectez-vous pour continuer</p>
          </div>

          <div className="login-right">
            <div className="logo-container">
              <img src={logoEglise} alt="Logo Église" className="logo-eglise" />
            </div>

            <h2>Connexion</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Mot de passe"
                className="form-control"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                required
              />
              <button type="submit" className="btn-login">
                Se connecter
              </button>
            </form>

            <div className="text-center mt-3">
              <p>Ou continuer avec</p>
              <div className="social-login">
                <button className="social-btn"><i className="fab fa-google"></i></button>
                <button className="social-btn"><i className="fab fa-apple"></i></button>
                <button className="social-btn"><i className="fab fa-facebook"></i></button>
              </div>
            </div>

            <div className="text-center mt-4">
              <p>
                Pas encore membre ?{" "}
                <a href="/register" className="text-link">
                  S'inscrire maintenant
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
