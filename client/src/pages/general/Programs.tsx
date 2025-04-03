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
import ValuesPicture from "../../components/display-and-tools/ValuesPicture";
import "./programs.css";
import { useRoles } from "../../services/usersContext";

export default function Programs() {
  const {
    belts,
    categories,
    techniquesByBelt,
    kodokanKatas,
    twentyAttacksKatas,
  } = useLoaderData() as {
    belts: BeltData[];
    categories: CategoryData[];
    techniquesByBelt: TechniqueData[];
    kodokanKatas: KataData[];
    twentyAttacksKatas: KataData[];
  };

  const { role } = useRoles();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const [hovered, setHovered] = useState<number | null>(null);

  const [beltName, setBeltName] = useState(
    ": cliquez sur la couleur de ceinture",
  );
  const [program, setProgram] = useState("Cliquez sur la couleur de ceinture");

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

  /**************RECUPERATION DES PROGRAMMES DANS UN AUTRE USEEFFECT POUR EVITER UNE BOUCLE INFINIE */
  useEffect(() => {
    if (selectedBeltRank !== null) {
      const belt = belts.find((belt) => belt.rank_order === selectedBeltRank);
      if (belt) {
        setBeltName(belt.name);
        setProgram(belt.program_description);
      } else {
        setBeltName("Pas de ceinture trouvée");
        setProgram("Pas de programme sélectionné");
      }
    }
  }, [selectedBeltRank, belts]);

  return (
    <main id="main" className="top programs">
      <div className="banner">
        <img src="/banner6.png" alt="jujitsukas en combat" />
        <h2>PROGRAMMES</h2>
      </div>
      <div className="filter-tools">
        <SearchBar />
        <Belts
          belts={belts}
          selectedBeltRank={selectedBeltRank}
          updateSelectedBelt={updateSelectedBelt}
          isSelectable={true}
        />
        <RadioButtons queryMode={queryMode} handleQueryMode={handleQueryMode} />
      </div>
      <section className={`program-content ${beltName}`}>
        <img src="/banner1.png" alt="" />
        <h3>Programme de la ceinture {beltName}</h3>
        <ul>
          {program.split("\n").map((line) => (
            <li key={line.slice(0, 15)}>{line}</li>
          ))}
        </ul>
        <div className="anchor-links">
          <a className="light-square" href="#techniques">
            Techniques
          </a>
          <a className="light-square" href="#kodokan">
            Kodokan
          </a>
          <a className="light-square" href="#20-imposees">
            20 imposées
          </a>
        </div>
      </section>

      <ul id="techniques">
        {categories.map((category) => (
          <li key={category.id}>
            <div className={`shadow2 ${category.slug}`}>
              <h3>{category.name}</h3>
            </div>
            <ul className="techniques-name">
              {techniquesByBelt
                .filter((technique) => technique.category_id === category.id)
                .map((technique) => (
                  <li
                    className="my-shadow4"
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
                ))}
            </ul>
          </li>
        ))}
      </ul>
      <ul className="sequences-kata-container">
        <li>
          <h3 id="kodokan">
            <Link to="/kodokan"> &gt; Kodokan Goshin Jutsu</Link>
          </h3>
          <ul>
            {kodokanKatas.map((kata) => (
              <li key={kata.id}>
                <Link to={"/kodokan"}>
                  <p>{kata.rank_order} -</p> <p> {kata.technique_name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </li>
        <li>
          <h3 id="20-imposees">
            <Link to="/twenty-attacks"> &gt; les 20 attaques imposées</Link>
          </h3>
          <ul>
            {twentyAttacksKatas.map((kata) => (
              <li key={kata.id}>
                <Link to="/twenty-attacks">
                  {kata.rank_order} {kata.technique_name}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>

      <div className="actions-buttons">
        <button
          onClick={handleBack}
          className="light-square big-radius"
          type="button"
        >
          RETOUR
        </button>
        <div className="anchor-links">
          <a className="light-square" href="#techniques">
            Techniques
          </a>
          <a className="light-square" href="#kodokan">
            Kodokan
          </a>
          <a className="light-square" href="#20-imposees">
            20 imposées
          </a>
        </div>
        {role === "admin" ? (
          <Link to="/techniques/new" className="dark-square big-radius">
            AJOUTER UNE TECHNIQUE
          </Link>
        ) : null}
      </div>
      <ValuesPicture />
    </main>
  );
}
