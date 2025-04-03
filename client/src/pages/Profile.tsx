import { motion } from "framer-motion";
import { useState } from "react";
import { useLoaderData, useRevalidator } from "react-router-dom";
import Swal from "sweetalert2";
import "./profile.css";
import ActionsIcons from "../components/forms/ActionsIcons";
import {
  putMemberBeltId,
  putMemberEmail,
  putMemberName,
  putMemberPassword,
} from "../services/eadRequests";

export default function Profile() {
  const { member, belts } = useLoaderData() as {
    member: MemberData;
    belts: BeltData[];
  };
  const { revalidate } = useRevalidator();
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  type EditingState = {
    name: boolean;
    email: boolean;
    password: boolean;
    belt_id: boolean;
  };

  const [isEditing, setIsEditing] = useState<EditingState>({
    name: false,
    email: false,
    password: false,
    belt_id: false,
  });
  const [editedMember, setEditedMember] = useState({
    name: member.name,
    belt_id: member.belt_id,
    belt_name: member.belt_name,
    email: member.email,
    password: "",
  });

  const [isVisible, setIsVisible] = useState(false);

  const handleChangeMember = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setEditedMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (field: keyof EditingState) => {
    setFormErrors({});
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field], // On inverse seulement la clé concernée
    }));
  };
  type Response = {
    success: boolean;
    message?: string;
    errors?: Record<string, string>;
  };

  const handleSubmit = async (
    e: React.FormEvent,
    field: keyof typeof isEditing,
  ) => {
    e.preventDefault();
    handleEdit(field);
    let response: Response = {
      success: false,
      message: "Aucune requête envoyée",
    };
    const valueToSend = { [field]: editedMember[field] };
    if (field === "name") {
      response = await putMemberName(valueToSend);
    }
    if (field === "belt_id") {
      response = await putMemberBeltId(valueToSend);
    }
    if (field === "password") {
      response = await putMemberPassword(valueToSend);
    }
    if (field === "email") {
      response = await putMemberEmail(valueToSend);
    }
    if (response?.errors) {
      Swal.fire({
        title: "Erreur de mise à jour",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
      setFormErrors(response.errors);
    } else {
      Swal.fire({
        title: "Mise à jour réussie",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      revalidate();
    }
  };
  return (
    <main className="profile">
      <section className="profile-container">
        <div className="desktop-display">
          <img src="/juji.png" alt="jujitsuka" className="desktop" />
          <motion.div
            className="desktop-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4, ease: "easeOut" }}
          >
            <h2>Bienvenue {editedMember.name} - san</h2>
            <img src="1.png" alt="" />
          </motion.div>
        </div>
        <div className="mobile-title">
          <h2>Bienvenue {editedMember.name} - san</h2>
          <img src="/juji.png" alt="jujitsuka" className="mobile" />
        </div>
        <section>
          <h3 className="dark-square">Mes infos</h3>
          <form>
            {formErrors && <p className="error">{formErrors.name}</p>}
            <div>
              <img src="../../public/user.svg" alt="" />
              {isEditing.name ? (
                <input
                  type="text"
                  name="name"
                  value={editedMember.name}
                  onChange={handleChangeMember}
                />
              ) : (
                <p>{editedMember.name}</p>
              )}{" "}
              <ActionsIcons
                isEditing={isEditing.name}
                onEdit={() => handleEdit("name")}
                onSave={(e) => handleSubmit(e, "name")}
                onCancel={() => handleEdit("name")}
              />
            </div>

            <div>
              <img src="../../public/mail.svg" alt="" />
              {isEditing.email ? (
                <input
                  type="email"
                  name="email"
                  value={editedMember.email}
                  onChange={handleChangeMember}
                />
              ) : (
                <p>{editedMember.email}</p>
              )}{" "}
              <ActionsIcons
                isEditing={isEditing.email}
                onEdit={() => handleEdit("email")}
                onSave={(e) => handleSubmit(e, "email")}
                onCancel={() => handleEdit("email")}
              />
            </div>

            <div className="password-container">
              <img src="../../public/lock.svg" alt="" />
              {isEditing.password ? (
                <>
                  <input
                    type={isVisible ? "text" : "password"}
                    name="password"
                    className="password-input"
                    placeholder="Mot de passe"
                    value={editedMember.password}
                    onChange={handleChangeMember}
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setIsVisible(!isVisible)}
                  >
                    <img
                      src={isVisible ? "/eye-off.svg" : "/eye.svg"}
                      alt="toggle visibility"
                    />
                  </button>
                </>
              ) : (
                <p>
                  {" "}
                  &#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;{" "}
                </p>
              )}
              <ActionsIcons
                isEditing={isEditing.password}
                onEdit={() => handleEdit("password")}
                onSave={(e) => handleSubmit(e, "password")}
                onCancel={() => handleEdit("password")}
              />
            </div>
            <div>
              <p>
                <strong>Mon grade : </strong>
              </p>
              {isEditing.belt_id ? (
                <select
                  name="belt_id"
                  value={Number(editedMember.belt_id)}
                  onChange={handleChangeMember}
                >
                  <option value="">Sélectionner un grade</option>
                  {belts.map((belt) => (
                    <option key={belt.id} value={belt.id}>
                      {belt.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p>ceinture {editedMember.belt_name}</p>
              )}
              <ActionsIcons
                isEditing={isEditing.belt_id}
                onEdit={() => handleEdit("belt_id")}
                onSave={(e) => handleSubmit(e, "belt_id")}
                onCancel={() => handleEdit("belt_id")}
              />
            </div>
          </form>
        </section>
      </section>
    </main>
  );
}
