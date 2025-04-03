import { Link, useNavigate, useRevalidator } from "react-router-dom";
import Swal from "sweetalert2";
import "./kodokan.css";
import { useEffect, useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import DeleteKataForm from "../../components/admin/DeleteKataForm";
import Belts from "../../components/display-and-tools/Belts";
import RadioButtons from "../../components/display-and-tools/RadioButtons";
import ValuesPicture from "../../components/display-and-tools/ValuesPicture";
import KataNoteForm from "../../components/forms/KataNoteForm";
import { postKodokanNote, putKodokanNote } from "../../services/eadRequests";
import { useRoles } from "../../services/usersContext";

export default function Kodokan() {
  const { belts, katas, notes } = useLoaderData() as {
    belts: BeltData[];
    katas: KataData[];
    notes: NoteData[];
  };

  const { role } = useRoles();
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();
  const handleBack = () => {
    navigate(-1);
  };
  /************AFFICHAGE AU CLICK DES DETAILS DES KATAS */
  const [openDetails, setOpenDetails] = useState<number | null>(null);
  const toggleDetails = (id: number | null) => {
    setOpenDetails(openDetails === id ? null : id);
  };
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
  /****NOTES*********************************************** */
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleEditNote = async (editedNote: NoteData) => {
    const noteId = editedNote.id;
    if (!noteId) {
      console.error("ID manquant pour la mise à jour de la note");
      return;
    }
    setFormErrors({});
    const response = await putKodokanNote(noteId, editedNote);
    console.info("Réponse de la requête : ", response);
    if (response?.errors) {
      Swal.fire({
        title: "Erreur de mise à jour",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
      setFormErrors(response.errors);
    } else {
      Swal.fire({
        title: "Mise à jour réussie !",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      console.info("modification réussie !");
    }
  };

  const handleNewNote = async (newNote: NoteData) => {
    setFormErrors({});
    const response = await postKodokanNote(newNote);

    if (response?.insertId) {
      Swal.fire({
        title: "Mise à jour réussie !",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      revalidate();
    } else if (response?.errors) {
      Swal.fire({
        title: "La note n'a pas pu être créée",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
      console.info("Erreurs de validation", response.errors);
      setFormErrors(response.errors);
    } else {
      Swal.fire({
        title: "La note n'a pas pu être créée",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Erreur lors de la création de la technique");
    }
  };
  const newNote = {
    content: "",
    kata_id: 0,
  };

  return (
    <main id="main" className="kodokan">
      <section className="top">
        <div className="banner">
          <img src="/banner4.png" alt="jujitsukas en combat" />
          <h2>KODOKAN GOSHIN JUTSU</h2>
        </div>
      </section>
      <section className="content">
        <p>
          Le Kodokan Goshin Jutsu est un ensemble de techniques modernes
          d'auto-défense développé en 1956 par le Kodokan, l’institution
          fondatrice du judo.
        </p>
        <p>
          Il combine des principes du judo avec des techniques issues du
          ju-jitsu traditionnel et d'autres arts martiaux, incluant des défenses
          contre des saisies, des frappes et des attaques armées (couteau,
          bâton, pistolet). Maîtriser le Kodokan Goshin Jutsu permet de
          développer des réflexes en situation réelle, d'affiner sa
          compréhension des principes du déséquilibre et du contrôle, et
          d'améliorer son efficacité en self-défense.
        </p>
        <p>
          Pour un pratiquant de judo ou de ju-jitsu, il représente une
          excellente formation complémentaire, alliant tradition et adaptation
          aux menaces modernes.
        </p>
      </section>
      <div className="options">
        <Belts
          belts={belts}
          selectedBeltRank={selectedBeltRank}
          updateSelectedBelt={updateSelectedBelt}
          isSelectable={true}
        />
        <RadioButtons queryMode={queryMode} handleQueryMode={handleQueryMode} />
      </div>
      <ul className="techniques-container">
        {katas.length > 0 ? (
          katas.map((kata) => (
            <li key={kata.id}>
              <h3
                id={`${kata.id}`}
                onClick={() => toggleDetails(kata.id ? kata.id : null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ")
                    toggleDetails(kata.id ? kata.id : null);
                }}
              >
                {kata.rank_order} {kata.technique_name} &nbsp;&nbsp;&nbsp; ▼
              </h3>
              <div
                className={`kata-details ${openDetails === kata.id ? "open" : "close"}`}
              >
                {openDetails === kata.id && (
                  <>
                    <p>
                      <strong>Attaque : </strong>
                      {kata.technique_signification}
                    </p>
                    <p>
                      <strong>Détails :</strong> {kata.defense}
                    </p>
                    {role === "admin" ? (
                      <>
                        <Link to={`/kodokan-katas/${kata.id}/edit`}>
                          MODIFIER
                        </Link>
                        {kata.id && (
                          <DeleteKataForm id={kata.id}>
                            SUPPRIMER
                          </DeleteKataForm>
                        )}
                      </>
                    ) : null}
                    {Array.isArray(notes) &&
                    notes.some((note) => note.kata_id === kata.id) ? (
                      notes
                        .filter((note) => note.kata_id === kata.id)
                        .map((note) => (
                          <KataNoteForm
                            key={note.id}
                            toAdd={false}
                            isKodokan={true}
                            defaultValue={note}
                            onSubmit={handleEditNote}
                            kataId={kata.id}
                            errors={formErrors}
                          />
                        ))
                    ) : (
                      <KataNoteForm
                        key={`add-${kata.id}`}
                        toAdd={true}
                        isKodokan={true}
                        defaultValue={newNote}
                        onSubmit={handleNewNote}
                        kataId={kata.id}
                        errors={formErrors}
                      />
                    )}
                  </>
                )}
              </div>
            </li>
          ))
        ) : (
          <li>Aucune technique</li>
        )}
      </ul>
      <div className="actions-buttons">
        {role === "admin" ? (
          <Link to="/katas/new" className="dark-square big-radius">
            AJOUTER UN KATA
          </Link>
        ) : null}
        <button
          onClick={handleBack}
          className="light-square big-radius"
          type="button"
        >
          RETOUR
        </button>
      </div>
      <ValuesPicture />
    </main>
  );
}
