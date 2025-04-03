import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import SearchBar from "../../components/display-and-tools/SearchBar";
import "./techniques.css";
import { useRoles } from "../../services/usersContext";

export default function Techniques() {
  const { role } = useRoles();
  const categories = useLoaderData() as CategoryData[];

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <main id="main" className="techniques top">
      <div className="banner">
        <img src="/banner1.png" alt="jujitsukas en combat" />
        <h2>TECHNIQUES</h2>
      </div>
      <SearchBar />
      <ul className="filter-options">
        {categories.map((category) => (
          <li className={`${category.slug} my-shadow2`} key={category.id}>
            <Link
              className="light-square my-shadow3"
              to={`/techniques/category/${category.slug}`}
              onMouseEnter={() => setHovered(category.id ?? null)}
              onMouseLeave={() => setHovered(null)}
            >
              {hovered === category.id ? category.signification : category.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="actions-buttons">
        <button
          onClick={handleBack}
          className="light-square big-radius my-shadow1"
          type="button"
        >
          RETOUR
        </button>
        {role === "admin" ? (
          <Link
            to="/techniques/new"
            className="dark-square big-radius my-shadow1 "
          >
            AJOUTER UNE TECHNIQUE
          </Link>
        ) : null}
      </div>
    </main>
  );
}
