import { useRef, useContext, useState } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const avatarRef = useRef();
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateAvatar } = userContext;

  const [avatar, setAvatar] = useState();

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <form
      className="popup__form"
      name="avatar-form"
      id="edit-avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="avatar"
          name="link"
          placeholder="Image Link"
          required
          type="url"
          ref={avatarRef}
          onChange={handleAvatarChange}
        />
        <span className="popup__error" id="avatar-error"></span>
      </label>
      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}
