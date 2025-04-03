import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import KataForm from "../../components/admin/Kataform";
import "../general/technique-details.css";
import {
  postKodokanKata,
  postTwentyAttacksKata,
} from "../../services/eadRequests";

export default function NewKata() {
  const { belts, categories, techniques } = useLoaderData() as {
    belts: BeltData[];
    categories: CategoryData[];
    techniques: TechniqueData[];
  };

  const navigate = useNavigate();

  const [sequence, setSequence] = useState("");

  const handleChangeSequence = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSequence(event.target.value);
  };

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleNewKata = async (newKata: NewKataData) => {
    setFormErrors({});
    let response: PostKataResponse | null;
    if (sequence === "kodokan") {
      response = await postKodokanKata(newKata);
      if (response?.insertId) {
        Swal.fire({
          title: "Nouveau kata créé !",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`/kodokan#${response.insertId}`);
      } else if (response?.errors) {
        Swal.fire({
          title: "Veuillez vérifier votre saisie",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        });
        setFormErrors(response.errors);
      } else {
        Swal.fire({
          title: "Erreur",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error("Erreur lors de l'ajout du kata");
      }
    }
    if (sequence === "twenty") {
      setFormErrors({});
      const response = await postTwentyAttacksKata(newKata);
      if (response?.insertId) {
        Swal.fire({
          title: "Nouveau kata créé !",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`/twenty-attacks#${response.insertId}`);
      } else if (response?.errors) {
        Swal.fire({
          title: "Veuillez vérifier votre saisie",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
        });
        setFormErrors(response.errors);
      } else {
        Swal.fire({
          title: "Erreur",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
        console.error("Erreur lors de l'ajout du kata");
      }
    }
  };

  const newKata = {
    id: 0,
    rank_order: "",
    defense: "",
    technique_id: 0,
    belt_id: 0,
  };

  return (
    <main id="main" className="techniques details top">
      <h2>CRÉER UN KATA</h2>
      <label className="technique-container sequence">
        <select
          name="sequence"
          value={sequence}
          onChange={handleChangeSequence}
        >
          <option value="-1">Choisissez une séquence *</option>
          <option value="kodokan">Kodokan Goshin Jutsu</option>
          <option value="twenty">Les 20 imposées</option>
        </select>
      </label>
      <KataForm
        belts={belts}
        categories={categories}
        techniques={techniques}
        defaultValue={newKata}
        onSubmit={handleNewKata}
        errors={formErrors}
        sequence={sequence}
      >
        AJOUTER UN KATA
      </KataForm>
    </main>
  );
}
