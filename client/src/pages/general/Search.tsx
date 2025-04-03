import { useEffect, useState } from "react";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ValuesPicture from "../../components/display-and-tools/ValuesPicture";

import { getSearchedTechniques } from "../../services/requests";

import Belts from "../../components/display-and-tools/Belts";
import SearchBar from "../../components/display-and-tools/SearchBar";

export default function Search() {
  const belts = useLoaderData() as BeltData[];

  const [results, setResults] = useState<TechniqueData[] | []>([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchedTechniques = queryParams.get("query");

    if (searchedTechniques) {
      getSearchedTechniques(searchedTechniques).then((foundedTechniques) => {
        setResults(foundedTechniques);
      });
    } else {
      setResults([]);
    }
  }, [location]);

  console.info(results);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  const rank_order = null;

  const [selectedBeltRank, setSelectedBeltRank] = useState<number | null>(
    rank_order ? rank_order : 6,
  );

  const updateSelectedBelt = (rank_order: number | null) => {
    setSelectedBeltRank(rank_order);
  };

  return (
    <main id="main" className="techniques top">
      <h2 className="top">FICHE</h2>
      <div className="filter-tools">
        <SearchBar />
        <Belts
          belts={belts}
          selectedBeltRank={selectedBeltRank}
          updateSelectedBelt={updateSelectedBelt}
          isSelectable={true}
        />
      </div>
      <ul className="techniques-container">
        {results.length > 0 ? (
          results
            .filter(
              (technique) =>
                Number(technique.belt_id) <= Number(selectedBeltRank),
            )
            .map((technique) => (
              <li className="light-square" key={technique.id}>
                <Link to={`/techniques/${technique.id}`}>{technique.name}</Link>
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
        <Link to="/techniques/new" className="dark-square big-radius">
          AJOUTER UNE TECHNIQUE
        </Link>
      </div>
      <ValuesPicture />
    </main>
  );
}
