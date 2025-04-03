import Swal from "sweetalert2";
import { deleteTechniqueNote } from "../../services/eadRequests";
export default function DeleteNoteForm({ id, children }: NoteDeleteFormProps) {
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDeleteNote = async () => {
    const result = await Swal.fire({
      title: "Êtes-vous sûr de vouloir supprimer cette note ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler",
    });

    if (result.isConfirmed) {
      const error = await deleteTechniqueNote(id);
      if (error) {
        Swal.fire("Erreur !", "La note n'a pas été supprimée.", "error");
      } else {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        Swal.fire("Supprimé !", "La note a bien été supprimée.", "success");
      }
    }
  };

  return (
    <div className="actions-icons">
      <button onClick={handleDeleteNote} type="submit">
        {children}
      </button>
    </div>
  );
}
