export default function ImagePopup(props) {
  const { name, link } = props;
  return (
    <>
      <img className="popup__image" src={link} alt="" />
      <p className="popup__caption">{name}</p>
    </>
  );
}
