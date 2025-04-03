import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./login-pop-up.css";
import { postLogin, postMember } from "../services/eadRequests";
import { useRoles } from "../services/usersContext";

export default function LoginPopUp({
  isOpen,
  onClose,
  belts,
}: LoginPopUpProps) {
  const { setRole } = useRoles();
  const navigate = useNavigate();

  const closeModal = () => {
    onClose();
  };
  const cancelChoices = () => {
    setOpenCreateAccount(false);
    setOpenLogin(false);
    setDisplayCreateButton(true);
  };

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChangeCredentials = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  /*********LOGIN*************** */
  const [openLogin, setOpenLogin] = useState(false);
  const [displayCreateButton, setDisplayCreateButton] = useState(true);
  const handleClickLogin = () => {
    setOpenLogin(!openLogin);
    setDisplayCreateButton(!displayCreateButton);
  };

  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await postLogin(credentials);
      console.info("response", response);
      if (response) {
        Swal.fire({
          title: "Connexion réussie",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setRole(response.role);
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Erreur de connexion",
        text:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue. Veuillez réessayer.",
        icon: "error",
        showConfirmButton: true,
      });
    }
  };

  /**********CREATE ACCOUNT ERRORS *********************** */
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  /*********CREATE ACCOUNT *************** */
  const [openCreateAccount, setOpenCreateAccount] = useState(false);

  const handleClickCreateAccount = () => {
    setOpenCreateAccount(!openCreateAccount);
  };
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    password: "",
    belt_id: 0,
  });
  const handleChangeNewMember = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setNewMember({
      ...newMember,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSubmitCreateAccount = async (
    e: React.FormEvent<HTMLFormElement | HTMLSelectElement>,
  ) => {
    e.preventDefault();
    setFormErrors({});

    try {
      const response = await postMember({
        ...newMember,
        belt_id: Number(newMember.belt_id),
      });

      if (response?.member?.insertId) {
        setNewMember({ name: "", email: "", password: "", belt_id: 0 });
        Swal.fire({
          title: "Compte créé avec succès",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        setRole(response.login.role);
        navigate("/home");
      } else if (response?.errors) {
        console.info("Erreurs de validation", response.errors);
        setFormErrors(response.errors);
        Swal.fire({
          title: "Erreur de validation",
          text: Object.values(response.errors).join("\n"),
          icon: "error",
          showConfirmButton: true,
        });
      } else {
        console.error("Erreur lors de la création du compte");
        Swal.fire({
          title: "Erreur inconnue",
          text: "Une erreur est survenue, veuillez réessayer.",
          icon: "error",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Erreur de connexion",
        text:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue. Veuillez réessayer.",
        icon: "error",
        showConfirmButton: true,
      });
    }
  };

  return (
    <dialog
      id="modal"
      open={isOpen}
      onClick={closeModal}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          closeModal();
        }
      }}
    >
      <div
        id="modal-content"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <button className="close-button" onClick={closeModal} type="button">
          &times;
        </button>
        <h3>Hajime !</h3>
        {openLogin === false && openCreateAccount === false && (
          <p>Choisissez une option :</p>
        )}
        <div className="actions-buttons">
          {openLogin === false && openCreateAccount === false && (
            <button
              type="button"
              className="modal-button dark-square big-radius"
              onClick={handleClickLogin}
            >
              Se connecter
            </button>
          )}
          {openLogin === true && (
            <form
              onSubmit={handleSubmitLogin}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmitLogin(e as React.FormEvent<HTMLFormElement>);
                }
              }}
            >
              <label>
                Email :
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChangeCredentials}
                  required
                />
              </label>
              <label>
                Mot de passe :
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChangeCredentials}
                  required
                />
              </label>
              <button
                type="submit"
                className="modal-button dark-square big-radius"
              >
                Se connecter
              </button>
              <button
                type="button"
                className="modal-button dark-square big-radius"
                onClick={cancelChoices}
              >
                Annuler
              </button>
            </form>
          )}
          {openCreateAccount === false && displayCreateButton === true && (
            <button
              type="button"
              className="modal-button dark-square big-radius"
              onClick={handleClickCreateAccount}
            >
              S'inscrire
            </button>
          )}
          {openCreateAccount === true && (
            <form
              onSubmit={handleSubmitCreateAccount}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmitCreateAccount(
                    e as React.FormEvent<HTMLFormElement>,
                  );
                }
              }}
            >
              <label>
                Pseudo :
                <input
                  type="text"
                  name="name"
                  value={newMember.name}
                  onChange={handleChangeNewMember}
                  required
                />
                {formErrors?.name && <p className="error">{formErrors.name}</p>}
              </label>
              <label>
                Email :
                <input
                  type="email"
                  name="email"
                  value={newMember.email}
                  onChange={handleChangeNewMember}
                  required
                />
                {formErrors?.email && (
                  <p className="error">{formErrors.email}</p>
                )}
              </label>
              <label>
                Mot de passe :
                <input
                  type="password"
                  name="password"
                  value={newMember.password}
                  onChange={handleChangeNewMember}
                  required
                />
              </label>
              {formErrors?.password && (
                <p className="error">{formErrors.password}</p>
              )}
              <label>
                Mon niveau actuel :
                <select
                  name="belt_id"
                  value={Number(newMember.belt_id)}
                  onChange={handleChangeNewMember}
                >
                  <option value="">Sélectionner un grade</option>
                  {belts.map((belt) => (
                    <option key={belt.id} value={belt.id}>
                      {belt.name}
                    </option>
                  ))}
                </select>
                {formErrors?.belt_id && (
                  <p className="error">{formErrors.belt_id}</p>
                )}
              </label>
              <button
                type="submit"
                className="modal-button dark-square big-radius"
              >
                S'inscrire
              </button>
            </form>
          )}
          {openCreateAccount === true && openLogin === false && (
            <>
              <p>J'ai déjà un compte</p>

              <button
                type="button"
                className="modal-button dark-square big-radius"
                onClick={() => {
                  handleClickLogin();
                  setOpenCreateAccount(false);
                }}
              >
                Se connecter
              </button>
            </>
          )}
          <Link
            to="/home"
            type="button"
            className="modal-button light-square"
            onClick={closeModal}
          >
            Continuer sans se connecter
          </Link>
        </div>
      </div>
    </dialog>
  );
}
