import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteKodokanKata } from "../../services/eadRequests";
import { deleteTwentyAttacksKata } from "../../services/eadRequests";

// {location.pathname.includes("kodokan") &&
export default function DeleteKataForm({
  id,
  children,
}: TechniqueDeleteFormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await Swal.fire({
      title: "Êtes-vous sûr de vouloir supprimer ce kata ?",
      text: "Cette action est irréversible !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler",
    });

    if (result.isConfirmed && location.pathname.includes("kodokan")) {
      await deleteKodokanKata(id);
      navigate("/kodokan");

      Swal.fire("Supprimé !", "Le kata a bien été supprimé.", "success");
    }
    if (result.isConfirmed && location.pathname.includes("twenty")) {
      await deleteTwentyAttacksKata(id);
      navigate("/twenty-attacks");

      Swal.fire("Supprimé !", "Le kata a bien été supprimé.", "success");
    }
  };

  return (
    <form className="delete-kata" onSubmit={handleDelete}>
      <button type="submit">{children}</button>
    </form>
  );
}
