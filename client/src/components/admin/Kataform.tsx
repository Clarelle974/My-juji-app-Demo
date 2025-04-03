import Belts from "../display-and-tools/Belts";
import "./kata-form.css";
import "../../pages/general/technique-details.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//utiliser sequence pour personnaliser champs rank_order et form
export default function KataForm({
  belts,
  categories,
  children,
  defaultValue,
  onSubmit,
  errors,
  sequence,
  techniques,
}: KataFormProps) {
  console.info(errors.defense);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const [selectedBeltRank, setSelectedBeltRank] = useState<number | null>(
    defaultValue.belt_id ? defaultValue.belt_id : null,
  );

  const updateSelectedBelt = (belt_id: number | null) => {
    setSelectedBeltRank(belt_id);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const newKata = new FormData(event.currentTarget);
        const rank_order =
          sequence === "kodokan"
            ? (newKata.get("rank_order") as string)
            : (newKata.get("rank_order") as string);
        const defense = newKata.get("defense") as string;
        const technique_id = Number(
          newKata.get("technique_id") as number | null,
        );
        const belt_id = selectedBeltRank === 0 ? null : selectedBeltRank;
        onSubmit({
          rank_order,
          defense,
          technique_id,
          belt_id,
        });
      }}
    >
      <article className="technique-container">
        <label className="rank_order_form">
          <h3>rang *</h3>
          {/* récupérer valeur sequence et mettre affichage différent selon kodokan ou technique */}
          <input
            type="text"
            name="rank_order"
            defaultValue={defaultValue.rank_order}
            placeholder="Exemple : 2 ou A2"
          />
          {errors?.rank_order && <p className="error">{errors.rank_order}</p>}
        </label>
        <label className="kata-technique">
          <select
            name="technique_id"
            defaultValue={
              defaultValue.technique_id ? defaultValue.technique_id : undefined
            }
          >
            <option value="-1">Choisissez une technique d'attaque *</option>
            {categories.map((category) => (
              <optgroup key={category.id} label={category.name}>
                {techniques
                  .filter((technique) => technique.category_id === category.id)
                  .map((technique) => (
                    <option key={technique.id} value={technique.id}>
                      {technique.name}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
          <p>
            La technique n'existe pas ?{" "}
            <Link to="/techniques/new"> &gt; Créez une technique</Link>
          </p>
          {errors?.technique_id && (
            <p className="error">{errors.technique_id}</p>
          )}
        </label>
        <label>
          <h3>détails et défense *</h3>
          <input
            type="text"
            name="defense"
            defaultValue={defaultValue.defense}
            placeholder="Entrez les détails de l'attaque si besoin, et la description de la réponse"
          />
          {errors?.defense && <p className="error">{errors.defense}</p>}
        </label>

        <h3 className="display-belts">
          exigible pour *:
          {
            <Belts
              belts={belts}
              selectedBeltRank={selectedBeltRank}
              updateSelectedBelt={updateSelectedBelt}
              isSelectable={true}
            />
          }
          {errors?.belt_id && <p className="error">{errors.belt_id}</p>}
        </h3>
      </article>
      <div className="actions-buttons">
        <button type="submit" className="dark-square big-radius">
          {children}
        </button>

        <button
          className="light-square big-radius"
          type="button"
          onClick={handleBack}
        >
          RETOUR
        </button>
      </div>
    </form>
  );
}
