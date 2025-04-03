import { useState } from "react";
import { useBelts } from "../../services/beltContext";
import { useRoles } from "../../services/usersContext";
import LoginPopUp from "../LoginPopUp";

export default function TechniqueNoteForm({
  defaultValue,
  onSubmit,
  techniqueId,
  errors,
}: NoteFormProps) {
  const { role } = useRoles();
  const { belts } = useBelts();
  /*******LOGIN POP UP PROPS */
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };
  /********************************* */

  return (
    <>
      <LoginPopUp isOpen={isModalOpen} onClose={closeModal} belts={belts} />
      {defaultValue?.content !== "" ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();

            const editedNote = new FormData(event.currentTarget);
            const content = editedNote.get("content");
            onSubmit({
              technique_id: defaultValue?.technique_id,
              content: content ? content.toString() : undefined,
            });
          }}
        >
          <div className="personal-notes">
            <h3>MES NOTES PERSONNELLES</h3>
            <button className="actions-icons" type="submit">
              <img src="/edit.svg" alt="modifier" />
            </button>
          </div>

          <input
            type="text"
            name="content"
            defaultValue={defaultValue?.content}
          />
          {errors?.content && <p className="error">{errors.content}</p>}
        </form>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const newNote = new FormData(event.currentTarget);
            const content = newNote.get("content");
            onSubmit({
              technique_id: techniqueId,
              content: content ? content.toString() : undefined,
            });
          }}
        >
          <h3>MES NOTES PERSONNELLES </h3>
          <input
            type="text"
            name="content"
            placeholder="ajoutez vos notes personnelles"
          />
          {role === "anonymous" ? (
            <div className="actions-icons">
              <button type="button" onClick={openModal}>
                <img src="/plus-square.svg" alt="ajouter" />
              </button>
            </div>
          ) : (
            <div className="actions-icons">
              <button type="submit">
                <img src="/plus-square.svg" alt="ajouter" />
              </button>
            </div>
          )}
        </form>
      )}
    </>
  );
}
