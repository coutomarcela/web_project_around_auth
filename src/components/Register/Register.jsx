import { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";

export default function Register({ onSignUp }) {
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

    onSignUp(email, password);
  }

  return (
    <>
      <h2 className="signup__form__title">Inscrever-se</h2>
      <form
        className="signup__form"
        name="signup-form"
        id="signup-form"
        noValidate
        onSubmit={handleSubmit}
      >
        <label className="signup__field">
          <input
            className="signup__input signup__input__username"
            id="username"
            name="username"
            placeholder="Email"
            required
            type="text"
            onChange={handleEmailChange}
          />
          <span className="signup_error" id="signup-error"></span>
        </label>
        <label className="signup__field">
          <input
            className="signup__input signup__input__password"
            id="paswword"
            name="password"
            placeholder="Senha"
            required
            type="password"
            onChange={handlePasswordChange}
          />
          <span className="password__error" id="password-error"></span>
        </label>
        <button className="button signup__button" type="submit">
          Cadastrar
        </button>
      </form>
      <p className="login__redirection">
        Já é um membro? Faça o login{" "}
        <Link className="login__link" to="/signin">
          {" "}
          aqui!
        </Link>
      </p>
    </>
  );
}
