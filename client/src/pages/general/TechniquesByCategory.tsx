import { useEffect, useState } from "react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Belts from "../../components/display-and-tools/Belts";
import RadioButtons from "../../components/display-and-tools/RadioButtons";
import SearchBar from "../../components/display-and-tools/SearchBar";
import "./techniques.css";
import { useRoles } from "../../services/usersContext";

export default function TechniquesByCategory() {
  const { belts, techniques } = useLoaderData() as {
    belts: BeltData[];
    techniques: TechniqueData[];
  };
  const { role } = useRoles();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const [hovered, setHovered] = useState<number | null>(null);

  const categoryName =
    techniques.length > 0
      ? techniques[0].category_name?.toUpperCase()
      : "Pas de nouvelle technique dans la catégorie";

  /*****AFFICHAGE DE L'ENSEMBLE DES TECHNIQUES OU DES NOUVELLES PAR CEINTURE *******/

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedBeltRank, setSelectedBeltRank] = useState<number | null>(
    searchParams.get("rank_order")
      ? Number(searchParams.get("rank_order"))
      : null,
  );
  const queryMode = searchParams.get("display") || "new-techniques";

  useEffect(() => {
    if (selectedBeltRank !== null) {
      let newRankOrder = selectedBeltRank.toString();

      if (queryMode === "all-techniques") {
        let rankList = "";
        for (let i = 1; i <= selectedBeltRank; i++) {
          rankList += i + (i < selectedBeltRank ? "," : "");
        }
        newRankOrder = rankList;
      }

      setSearchParams({ rank_order: newRankOrder, display: queryMode });
    }
  }, [selectedBeltRank, queryMode, setSearchParams]);

  const updateSelectedBelt = (rank_order: number) => {
    setSelectedBeltRank(rank_order);
  };

  const handleQueryMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({ display: event.currentTarget.value });
  };

  return (
    <main id="main" className="techniques top">
      <div className="banner">
        <img src="/banner6.png" alt="jujitsukas en combat" />
        <h2>{categoryName?.toUpperCase()}</h2>
      </div>
      <div className="filter-tools">
        <Belts
          belts={belts}
          selectedBeltRank={selectedBeltRank}
          updateSelectedBelt={updateSelectedBelt}
          isSelectable={true}
        />
        <RadioButtons queryMode={queryMode} handleQueryMode={handleQueryMode} />
        <SearchBar />
      </div>

      <ul className="techniques-container">
        {techniques.length > 0 ? (
          techniques.map((technique) => (
            <li
              className="light-square"
              key={technique.id}
              onMouseEnter={() => setHovered(technique.id ?? null)}
              onMouseLeave={() => setHovered(null)}
            >
              <Link to={`/techniques/${technique.id}`}>
                {hovered === technique.id
                  ? technique.signification
                  : technique.name}
              </Link>
            </li>
          ))
        ) : (
          <li>Aucune technique</li>
        )}
      </ul>
      <div className="actions-buttons">
        <button
          onClick={handleBack}
          className="light-square big-radius"
          type="button"
        >
          RETOUR
        </button>
        {role === "admin" ? (
          <Link to="/techniques/new" className="dark-square big-radius">
            AJOUTER UNE TECHNIQUE
          </Link>
        ) : null}
      </div>
    </main>
  );
}
