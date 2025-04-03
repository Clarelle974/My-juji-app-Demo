import { useState } from "react";
import { useBelts } from "../../services/beltContext";
import { useRoles } from "../../services/usersContext";
import LoginPopUp from "../LoginPopUp";
import DeleteKodokanNoteForm from "./DeleteKodokanNoteForm";
import DeleteTwentyNoteForm from "./DeleteTwentyNoteForm";

export default function KataNoteForm({
  toAdd,
  isKodokan,
  defaultValue,
  onSubmit,
  kataId,
  errors,
}: KataNoteFormProps) {
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
      {toAdd === false ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const editedNote = new FormData(event.currentTarget);
            const content = editedNote.get("content");
            onSubmit({
              kata_id: defaultValue?.kata_id,
              id: defaultValue?.id,
              content: content ? content.toString() : undefined,
            });
          }}
        >
          <div>
            <h3>MES NOTES PERSONNELLES</h3>
          </div>

          <input
            type="text"
            name="content"
            defaultValue={defaultValue?.content}
          />
          <div className="actions-picto ">
            <button type="submit">
              <img src="./public/edit.svg" alt="modifier" />
            </button>
            {defaultValue?.id && isKodokan ? (
              <DeleteKodokanNoteForm id={defaultValue.id}>
                <img src="./public/trash-2.svg" alt="supprimer" />
              </DeleteKodokanNoteForm>
            ) : null}
            {defaultValue?.id && !isKodokan ? (
              <DeleteTwentyNoteForm id={defaultValue.id}>
                <img src="./public/trash-2.svg" alt="supprimer" />
              </DeleteTwentyNoteForm>
            ) : null}
            {errors?.content && <p className="error">{errors.content}</p>}
          </div>
        </form>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const newNote = new FormData(event.currentTarget);
            const content = newNote.get("content");
            onSubmit({
              kata_id: kataId,
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
            <button
              className="actions-picto "
              type="button"
              onClick={openModal}
            >
              <img src="./public/edit.svg" alt="ajouter" />
            </button>
          ) : (
            <button className="actions-picto " type="submit">
              <img src="./public/edit.svg" alt="ajouter" />
            </button>
          )}
          {errors?.content && <p className="error">{errors.content}</p>}
        </form>
      )}
    </>
  );
}
