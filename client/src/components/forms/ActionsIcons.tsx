export default function ActionsIcons({
  isEditing,
  onEdit,
  onSave,
  onCancel,
}: ActionsIconsProps) {
  return (
    <div className="actions-icons">
      {!isEditing && (
        <button type="button" onClick={onEdit}>
          <img src="/edit.svg" alt="modifier" />
        </button>
      )}
      {isEditing && (
        <>
          <button type="submit" onClick={onSave}>
            <img src="/save.svg" alt="enregistrer" />
          </button>
          <button type="button" onClick={onCancel}>
            <img src="/cancel.svg" alt="annuler" />
          </button>
        </>
      )}
    </div>
  );
}
