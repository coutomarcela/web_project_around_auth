import successIcon from "../../images/success.png";
import errorIcon from "../../images/error.png";

export default function InfoToolTip({ isSuccess, text }) {
  return (
    <div className="infotooltip">
      <img
        className="infotooltip__image"
        src={isSuccess ? successIcon : errorIcon}
        alt={isSuccess ? "Ícone de sucesso" : "Ícone de erro"}
      />
      <p className="infotooltip__text">{text}</p>
    </div>
  );
}
