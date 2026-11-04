//DOIS POPUPS:
//1. VITÓRIA! VOCÊ PRECISA SE REGISTRAR
//2.OPS, ALGO DEU ERRADO.POR FAVOR, TENTE NOVAMENTE.
import successIcon from "../../images/success.png";
import errorIcon from "../../images/error.png";
import "./infotooltip.css";

export default function InfoToolTip({ isSuccess }) {
  return (
    <div className="infotooltip">
      <img
        className="infotooltip__image"
        src={isSuccess ? successIcon : errorIcon}
        alt="Ícone de sucesso"
      />
      <p className="infotooltip__text">
        {isSuccess
          ? "Vitória! Você precisa se registrar."
          : "Ops, algo deu errado. Por favor, tente novamente."}
      </p>
    </div>
  );
}
