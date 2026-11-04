import avatar from "../../images/avatar.jpg";
import Card from "./components/Card/Card";
import { useState, useEffect, useContext } from "react";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import Popup from "./components/Popup/Popup";
import api from "../../utils/api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Main({
  onOpenPopup,
  onClosePopup,
  popup,
  cards,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
}) {
  //objetos que contém a informação que será utilizada para renderizar popups específicos
  const newCardPopup = {
    title: "New card",
    children: <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />,
  };
  const editProfilePopup = { title: "Edit Profile", children: <EditProfile /> };
  const editAvatarPopup = { title: "Edit Avatar", children: <EditAvatar /> };
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__image-container">
          <img
            src={currentUser.avatar}
            alt="Avatar"
            className="profile__image"
          />
          <button
            className="profile__image-hover"
            onClick={() => onOpenPopup(editAvatarPopup)}
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            aria-label="Editar perfil"
            className="profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          aria-label="Adicionar cartão"
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        ></button>
      </section>
      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            //a prop se chama card e o valor de card é = objeto card (de cards)
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={onOpenPopup}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
