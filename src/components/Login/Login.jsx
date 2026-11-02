import { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    onLogin(email, password);
  }

  return (
    <>
      <h2 className="login__form__title">Entrar</h2>
      <form
        className="login__form"
        name="login-form"
        id="login-form"
        noValidate
        onSubmit={handleSubmit}
      >
        <label className="login__field">
          <input
            className="login__input login__input__username"
            id="username"
            name="username"
            placeholder="Email"
            required
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
          <span className="login_error" id="login-error"></span>
        </label>
        <label className="login__field">
          <input
            className="login__input login__input__password"
            id="pasword"
            name="password"
            placeholder="Senha"
            required
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <span className="password__error" id="password-error"></span>
        </label>
        <button className="button login__button" type="submit">
          Entrar
        </button>
      </form>
      <p className="signup__redirection">
        Ainda não é membro? Inscreva-se{" "}
        <Link className="signup__link" to="/signup">
          {" "}
          aqui!
        </Link>
      </p>
    </>
  );
}
