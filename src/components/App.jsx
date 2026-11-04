import { useState, useEffect } from "react";
import reactLogo from "../assets/react.svg";
import viteLogo from "../assets/vite.svg";
import heroImg from "../assets/hero.png";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import api from "../utils/api.js";
import { auth } from "../utils/auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import InfoToolTip from "./InfoTooltip/InfoTooltip.jsx";
import Popup from "./Main/components/Popup/Popup.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasError, setHasError] = useState(false);

  //O QUE HANDLECARDLIKE FAZ:
  //chama a API pra avisar o servidor que o card foi curtido/descurtido, espera a resposta, e atualiza o cards no estado com o card atualizado que veio do servidor
  async function handleCardLike(card) {
    // guardar o estado atual do card
    const isLiked = card.isLiked;

    // Enviar uma solicitação para a API e obter os dados do cartão atualizados
    await api
      //clicar no coração do card curte ou descurte o mesmo, por isso !isLiked
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        //setCards atualiza a variável cards, atribuindo data como valor
        setCards(data);
      })
      .catch((error) => console.error(error));
  }, []);

  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== card._id),
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleAddPlaceSubmit(card) {
    await api
      .addCard(card.name, card.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((error) => console.log(error));
  }

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    auth //gerenciador de usuários
      .getUser(token)
      .then((userData) => {
        setCurrentUser((prevData) => ({ ...prevData, ...userData.data.email })); // guarda os dados do usuário no estado
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser((prevData) => ({ ...prevData, ...userData }));
      })
      .catch((error) => console.error(error));
  }, []);

  const handleUpdateUser = (data) => {
    (async () => {
      await api
        .editUserInfo(data.name, data.about)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) => console.error(error));
    })();
  };

  const handleUpdateAvatar = async (data) => {
    try {
      const newData = await api.editUserAvatar(data.avatar);
      setCurrentUser(newData);
      handleClosePopup();
    } catch (error) {
      console.error(error);
    }
  };

  //acessa rota de auth para chamar api e fazer login
  const handleLogin = async (email, password) => {
    try {
      const newData = await auth.signIn(email, password);
      console.log(newData);
      const userData = await auth.getUser(newData.token);
      console.log(userData);
      localStorage.setItem("token", newData.token);
      setIsLoggedIn(true);
      const userInfo = await api.getUserInfo();
      console.log(userInfo);
      // setCurrentUser(userData.data);
      console.log(userData.data);
      navigate("/");
    } catch (error) {
      setHasError(true);
      console.log(hasError);
      // console.error(error);
    }
  };

  const handleSignUp = async (email, password) => {
    try {
      const newData = await auth.signUp(email, password);
      console.log(newData);
      handleOpenPopup({ children: <InfoToolTip isSuccess={true} /> });
    } catch (error) {
      handleOpenPopup({ children: <InfoToolTip isSuccess={false} /> });
      console.error(error);
    }
  };

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate("/signin");
  }

  return (
    <>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleUpdateUser,
          handleUpdateAvatar,
          isLoggedIn,
          handleLogout,
        }}
      >
        {" "}
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <div className="page__content">
                <ProtectedRoute>
                  <Main
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    popup={popup}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onAddPlaceSubmit={handleAddPlaceSubmit}
                  />
                </ProtectedRoute>
              </div>
            }
          />
          <Route
            path="/signin"
            element={
              <div className="page__content">
                <Login onLogin={handleLogin} />
              </div>
            }
          />
          <Route
            path="/signup"
            element={
              <div className="page__content">
                <Register onSignUp={handleSignUp} />
              </div>
            }
          />
        </Routes>
        <Footer />
        {popup && (
          <Popup onClose={handleClosePopup} title={popup.title}>
            {popup.children}
          </Popup>
        )}
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
