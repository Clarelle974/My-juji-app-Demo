import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import TechniqueForm from "../../components/admin/TechniqueForm";
import "../general/technique-details.css";
import { putTechnique } from "../../services/eadRequests";

export default function EditTechnique() {
  const { belts, technique, categories } = useLoaderData() as {
    belts: BeltData[];
    technique: TechniqueData;
    categories: CategoryData[];
  };

  const navigate = useNavigate();

  const { id } = useParams();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleEditTechnique = async (editedTechnique: TechniqueData) => {
    if (!id) {
      console.error("ID manquant pour la mise à jour de la technique");
      return;
    }
    const response = await putTechnique(id, editedTechnique);
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
      navigate(`/techniques/${technique.id}`);
    } else {
      Swal.fire({
        title: "Erreur",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Erreur lors de la mise à jour de la technique");
    }
  };

  return (
    <main id="main" className="techniques details top">
      <h2>MODIFIER UNE FICHE</h2>
      <TechniqueForm
        belts={belts}
        categories={categories}
        defaultValue={technique}
        onSubmit={handleEditTechnique}
        errors={formErrors}
      >
        Modifier une technique
      </TechniqueForm>
    </main>
  );
}
