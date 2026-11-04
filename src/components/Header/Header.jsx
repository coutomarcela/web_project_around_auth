import logo from "../../images/logo.svg";
import { useLocation, Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Header() {
  const location = useLocation();
  const { currentUser, isLoggedIn, handleLogout } =
    useContext(CurrentUserContext);
  return (
    <header className="header page__section">
      <img src={logo} alt="Around the U.S logo" className="logo header__logo" />
      <div className="header__text">
        {location.pathname === "/signin" ? (
          <Link className="header__redirection" to="/signup">
            Entrar
          </Link>
        ) : location.pathname === "/signup" ? (
          <Link className="header__redirection" to="/signin">
            Faça o login
          </Link>
        ) : (
          isLoggedIn && (
            <>
              <p>{currentUser.email} </p>
              <button className="header__logout__button" onClick={handleLogout}>
                Sair
              </button>
            </>
          )
        )}
      </div>
    </header>
  );
}
