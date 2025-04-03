import "./radio-buttons.css";

export default function RadioButtons({
  queryMode,
  handleQueryMode,
}: RadioButtonsProps) {
  return (
    <fieldset
      className="display-radio"
      aria-label="choix des filtres d'affichage"
    >
      <legend className="skip-link">Choisissez votre mode de recherche</legend>
      <div>
        <input
          type="radio"
          id="all-techniques"
          value="all-techniques"
          name="display"
          checked={queryMode === "all-techniques"}
          onChange={handleQueryMode}
        />
        <label htmlFor="all-techniques">voir toutes les techniques</label>
      </div>
      <div>
        <input
          type="radio"
          id="new-techniques"
          value="new-techniques"
          name="display"
          checked={queryMode === "new-techniques"}
          onChange={handleQueryMode}
        />
        <label htmlFor="new-techniques">
          voir uniquement les nouvelles techniques
        </label>
      </div>
    </fieldset>
  );
}
