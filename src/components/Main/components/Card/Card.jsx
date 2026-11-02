import ImagePopup from "../Popup/components/ImagePopup/ImagePopup";
import { useContext } from "react";
import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";

export default function Card(props) {
  const card = props.card;
  const { name, link, isLiked } = card;
  const { handleOpenPopup } = props;
  const { onCardLike } = props;
  const { onCardDelete } = props;
  const imageComponent = { children: <ImagePopup name={name} link={link} /> };
  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_is-active" : ""
  }`;
  const { currentUser } = useContext(CurrentUserContext);

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteCard = () => {
    onCardDelete(card);
  };

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt=""
        onClick={() => handleOpenPopup(imageComponent)}
      />
      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={handleDeleteCard}
      />
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}

//Fluxo do botão de curtir:
//1. CLIQUE NO BOTÃO - botão tem a propriedade onClick que faz handleLikeClick rodar
//2. handleLikeClick - é declarada no Card.jsx e chama onCardLike (prop, função que veio de fora, do Main. No Card.jsx é chamada assim, mas no Main.jsx é handleCardLike)
//3. handleCardLike roda no Main.jsx porque <Card onCardLike={handleCardLike} ... /> (quando Card chamar onCardLike, quem executa na verdade é a função handleCardLike)
//4. Dentro de handleCardLike, changeLikeCardStatus pega o card.id e o estado invertido !isLiked e manda para a api
//5. A api pega o id e o booleano, decide se roda addCardLike ou removeCardLike e faz o fetch de volta para o servidor
//6. O servidor responde com o card atualizado
//7. A resposta volta para o then dentro de handleCardLike
//8. Com o newCard confirmado pelo servidor, Main chama setCards e atualiza o estado do card, atualizando na tela

//DICAS PARA AS FUNÇÕES:
//1. Função que mexe em estado (useState/setCards) mora no componente dono do estado (Main). Função que só captura o clique e repassa o dado adiante mora no componente onde o botão está (Card). Uma não invade o território da outra.
//2. Funções locais de um componente não vazam pra outro — só props cruzam essa fronteira, e só de cima pra baixo (pai → filho).
