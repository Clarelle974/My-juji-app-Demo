import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteTechnique } from "../../services/eadRequests";

function DeleteTechniqueForm({ id, children }: TechniqueDeleteFormProps) {
  const navigate = useNavigate();
  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await Swal.fire({
      title: "Êtes-vous sûr de vouloir supprimer cette technique ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler",
    });

    if (result.isConfirmed) {
      await deleteTechnique(id);
      navigate("/techniques");

      Swal.fire("Supprimé !", "La technique a bien été supprimée.", "success");
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button type="submit" className="dark-square big-radius">
        {children}
      </button>
    </form>
  );
}

export default DeleteTechniqueForm;
