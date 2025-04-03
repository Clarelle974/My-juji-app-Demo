import Belts from "../display-and-tools/Belts";
import "./technique-form.css";
import "../../pages/general/technique-details.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TechniqueForm({
  belts,
  categories,
  children,
  defaultValue,
  onSubmit,
  errors,
}: TechniqueFormProps) {
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

        const newTechnique = new FormData(event.currentTarget);

        const name = newTechnique.get("name") as string;
        const description = newTechnique.get("description") as string;
        const signification = newTechnique.get("signification") as string;
        const category_id = Number(newTechnique.get("category_id")) as number;
        const belt_id = selectedBeltRank === 0 ? null : selectedBeltRank;
        onSubmit({
          name,
          description,
          signification,
          category_id,
          belt_id,
        });
      }}
    >
      <article className="technique-container">
        <label className="form">
          <h3>nom *</h3>
          <input type="text" name="name" defaultValue={defaultValue.name} />
          {errors?.name && <p className="error">{errors.name}</p>}
        </label>
        <label>
          <h3>traduction *</h3>
          <input
            type="text"
            name="signification"
            defaultValue={defaultValue.signification}
          />
          {errors?.signification && (
            <p className="error">{errors.signification}</p>
          )}
        </label>
        <label>
          <h3>famille *</h3>
          <select
            name="category_id"
            defaultValue={defaultValue.category_id?.toString()}
          >
            <option value="-1">Choisissez une famille</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors?.category_id && <p className="error">{errors.category_id}</p>}
        </label>
        <label>
          <h3>description</h3>
          <input
            type="text"
            name="description"
            defaultValue={defaultValue.description}
          />
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
