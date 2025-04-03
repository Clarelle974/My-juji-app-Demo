import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import TechniqueForm from "../../components/admin/TechniqueForm";
import "../general/technique-details.css";
import Swal from "sweetalert2";
import { postTechnique } from "../../services/eadRequests";

export default function NewTechnique() {
  const { belts, categories } = useLoaderData() as {
    belts: BeltData[];
    categories: CategoryData[];
  };

  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleNewTechnique = async (newTechnique: NewTechniqueData) => {
    setFormErrors({});
    const response = await postTechnique(newTechnique);

    if (response?.insertId) {
      Swal.fire({
        title: "Nouvelle technique créée !",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(`/techniques/${response.insertId}`);
    } else if (response?.errors) {
      Swal.fire({
        title: "Veuillez vérifier votre saisie",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
      console.info("Erreurs de validation", response.errors);
      setFormErrors(response.errors);
    } else {
      Swal.fire({
        title: "Erreur",
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Erreur lors de la création de la technique");
    }
  };

  const newTechnique = {
    id: 0,
    name: "",
    description: "",
    signification: "",
    category_id: 0,
    belt_id: 0,
  };

  return (
    <main id="main" className="techniques details top">
      <h2>CRÉER UNE FICHE</h2>

      <TechniqueForm
        belts={belts}
        categories={categories}
        defaultValue={newTechnique}
        onSubmit={handleNewTechnique}
        errors={formErrors}
      >
        AJOUTER UNE TECHNIQUE
      </TechniqueForm>
    </main>
  );
}
