import { useState } from "react";
import { Link } from "react-router-dom";
import "./burger-menu.css";

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`container ${isOpen ? "menu-open" : ""}`}>
      <div className="header">
        <button
          className={`burger ${isOpen ? "open" : ""}`}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
        <h1>Mon appli Juji</h1>
      </div>

      {/* MENU LATERAL */}
      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/home" onClick={() => setIsOpen(false)}>
              Accueil
            </Link>
          </li>
          <li>
            <Link to="/programs" onClick={() => setIsOpen(false)}>
              Les programmes
            </Link>
          </li>
          <li>
            <Link to="/techniques" onClick={() => setIsOpen(false)}>
              Techniques
            </Link>
          </li>
          <li>
            <Link to="/kodokan" onClick={() => setIsOpen(false)}>
              Kodokan Goshin Jutsu
            </Link>
          </li>
          <li>
            <Link to="/twenty-attacks" onClick={() => setIsOpen(false)}>
              Les 20 attaques imposées
            </Link>
          </li>
          <li>
            <Link to="/values" onClick={() => setIsOpen(false)}>
              Les valeurs
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
