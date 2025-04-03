import BurgerMenu from "./BurgerMenu";
import "./header.css";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useBelts } from "../../services/beltContext";
import { useRoles } from "../../services/usersContext";
import LoginPopUp from "../LoginPopUp";
import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
  const { belts } = useBelts();
  const { role, setRole } = useRoles();
  const navigate = useNavigate();

  const logout = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/logout`, {
        withCredentials: true,
      })
      .then(() => {
        setRole("anonymous");
        Swal.fire({
          title: "Vous avez été déconnecté",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Une erreur est survenue, veuillez réessayer",
          icon: "error",
          showConfirmButton: true,
        });
        console.error(error);
      });
    navigate("/");
  };

  /*******LOGIN POP UP PROPS */
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };
  /********************************* */

  return (
    // <header className="my-shadow1">
    <header>
      <div className="nav">
        <div className="desktop links">
          <ul>
            <li>
              <Link to="/programs">Les programmes</Link>
            </li>
            <li>
              <Link to="/techniques">Techniques</Link>
            </li>
            <li>
              <Link to="/kodokan">Kodokan Goshin Jutsu</Link>
            </li>
            <li>
              <Link to="/twenty-attacks">Les 20 attaques imposées</Link>
            </li>
            <li>
              <Link to="/values">Les valeurs</Link>
            </li>
          </ul>
        </div>
        <div className="icons">
          <DarkModeToggle />
          <Link to="/home">
            <img src="/17.png" alt="icone de dojo" />
            <span>Home</span>
          </Link>
          {role === "admin" ? (
            <>
              <Link to="/profile">
                <img src="/27.png" alt="icone d'administrateur" />
                <span>Administrateur</span>
              </Link>
              <button
                type="submit"
                aria-label="Se déconnecter"
                onClick={logout}
              >
                <img src="/log-out.svg" alt="se déconnecter" />
              </button>
            </>
          ) : null}{" "}
          {role === "applicant" ? (
            <>
              <Link to="/profile">
                <img src="/8.png" alt="icone d'utilisateur" />
                <span>Mon profil</span>
              </Link>
              <button
                type="submit"
                onClick={logout}
                aria-label="Se déconnecter"
              >
                <img src="/log-out.svg" alt="se déconnecter" />
                <span>Se déconnecter</span>
              </button>
            </>
          ) : null}
          {role === "anonymous" ? (
            <>
              <button type="button" onClick={openModal}>
                <img src="/8.png" alt="icone d'utilisateur" />
                <span>Se connecter / Créer un compte</span>
              </button>
              <LoginPopUp
                isOpen={isModalOpen}
                onClose={closeModal}
                belts={belts}
              />
            </>
          ) : null}
        </div>
      </div>
      <BurgerMenu />
      <Link to="/" className="desktop-top">
        <img src="/1.png" alt="jujitsu en japonais" />
        <h1>Mon appli Juji</h1>
      </Link>
    </header>
  );
}
