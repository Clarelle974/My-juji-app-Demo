import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import KataForm from "../../components/admin/Kataform";
import "../general/technique-details.css";
import DeleteKataForm from "../../components/admin/DeleteKataForm";
import { putKodokanKata } from "../../services/eadRequests";

export default function EditKodokanKata() {
  const { belts, categories, techniques, kata } = useLoaderData() as {
    belts: BeltData[];
    kata: KataData;
    categories: CategoryData[];
    techniques: TechniqueData[];
  };
  const navigate = useNavigate();

  const { id } = useParams();

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleEditKata = async (editedKata: KataData) => {
    if (!id) {
      console.error("ID manquant pour la mise à jour de la technique");
      return;
    }
    const response = await putKodokanKata(id, editedKata);
    if (response?.errors) {
      Swal.fire({
        title: "Veuillez vérifier votre saisie",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
      setFormErrors(response.errors);
    } else if (response) {
      Swal.fire({
        title: "Modification réussie !",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(`/kodokan#${kata.id}`);
    } else {
      Swal.fire({
        title: "Erreur",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Erreur lors de la modification du kata");
    }
  };

  return (
    <main id="main" className="techniques details top">
      <h2>Modifier une fiche</h2>
      <KataForm
        belts={belts}
        categories={categories}
        techniques={techniques}
        defaultValue={kata}
        onSubmit={handleEditKata}
        errors={formErrors}
        sequence="kodokan"
      >
        MODIFIER UN KATA
      </KataForm>
      {kata.id && <DeleteKataForm id={kata.id}>SUPPRIMER</DeleteKataForm>}
    </main>
  );
}
