import Swal from "sweetalert2";
import DeleteTechniqueForm from "../../components/admin/DeleteTechniqueForm";
import Belts from "../../components/display-and-tools/Belts";
import SearchBar from "../../components/display-and-tools/SearchBar";
import "./technique-details.css";
import { useState } from "react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from "react-router-dom";
import DeleteNoteForm from "../../components/forms/DeleteNoteForm";
import TechniqueNoteForm from "../../components/forms/TechniqueNoteForm";
import { postTechniqueNote } from "../../services/eadRequests";
import { putTechniqueNote } from "../../services/eadRequests";
import { useRoles } from "../../services/usersContext";

export default function TechniqueDetails() {
  const { belts, technique, note } = useLoaderData() as {
    belts: BeltData[];
    technique: TechniqueData;
    note: NoteData;
  };
  const { role } = useRoles();

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const { revalidate } = useRevalidator();

  const [selectedBeltRank, setSelectedBeltRank] = useState(technique.belt_id);

  const updateSelectedBelt = (rank_order: number | null) => {
    setSelectedBeltRank(rank_order);
  };

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleEditNote = async (editedNote: NoteData) => {
    const noteId = note.id;
    if (!noteId) {
      console.error("ID manquant pour la mise à jour de la technique");
      return;
    }
    setFormErrors({});
    const response = await putTechniqueNote(noteId, editedNote);
    console.info("Réponse de la requête : ", response);
    if (response?.errors) {
      Swal.fire({
        title: "Vérifiez votre saisie",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
      console.info("Erreurs de validation", response.errors);
      setFormErrors(response.errors);
    } else {
      Swal.fire({
        title: "Modification réussie !",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleNewNote = async (newNote: NoteData) => {
    setFormErrors({});

    const response = await postTechniqueNote(newNote);

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
      setFormErrors(response.errors);
    } else {
      Swal.fire({
        title: "La note n'a pas pu être créée",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Erreur lors de la création de la note");
    }
  };
  const newNote = {
    content: "",
    technique_id: technique.id,
  };

  return (
    <main id="main" className="techniques details top">
      <h2>FICHE</h2>
      <SearchBar />
      <article className="technique-container">
        <h3>nom</h3>
        <p>{technique.name}</p>
        <h3>traduction</h3>
        <p>{technique.signification}</p>
        <h3>famille</h3>
        <p>{technique.category_name}</p>
        <h3>description</h3>
        <p>{technique.description}</p>
        <section className="personal-notes">
          {note ? (
            <>
              <TechniqueNoteForm
                defaultValue={note}
                onSubmit={handleEditNote}
                techniqueId={technique.id}
                errors={formErrors}
              />
              {note?.id && (
                <DeleteNoteForm id={note.id}>
                  <img src="/trash-2.svg" alt="supprimer" />
                </DeleteNoteForm>
              )}
            </>
          ) : (
            <TechniqueNoteForm
              defaultValue={newNote}
              onSubmit={handleNewNote}
              techniqueId={technique.id}
              errors={formErrors}
            />
          )}
        </section>
        <h3 className="display-belts">
          exigible pour :
          {
            <Belts
              belts={belts}
              selectedBeltRank={selectedBeltRank}
              updateSelectedBelt={updateSelectedBelt}
              isSelectable={false}
            />
          }
        </h3>
      </article>
      <div className="actions-buttons">
        <button
          className="light-square big-radius"
          type="button"
          onClick={handleBack}
        >
          RETOUR
        </button>
        {role === "admin" ? (
          <>
            <Link
              className="dark-square big-radius"
              to={`/techniques/${technique.id}/edit`}
            >
              MODIFIER
            </Link>
            <Link to="/techniques/new" className="light-square big-radius">
              AJOUTER UNE TECHNIQUE
            </Link>
            {technique.id && (
              <DeleteTechniqueForm id={technique.id}>
                SUPPRIMER
              </DeleteTechniqueForm>
            )}
          </>
        ) : null}
      </div>
    </main>
  );
}
