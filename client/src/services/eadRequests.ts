import axios from "axios";

const deleteKodokanNote = async (id: number): Promise<string | null> => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/notes/kodokan/${id}`,
      { withCredentials: true },
    );
    console.info("La note a été supprimée avec succès !");
    return null;
  } catch (error) {
    console.error(
      "La note n'a pas pu être supprimée dans la base de données",
      error,
    );
    return "La suppression de la note a échoué. Veuillez réessayer.";
  }
};

const deleteTechnique = async (id: number) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/techniques/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error(
      "La technique n'a pas pu être supprimée dans la base de données",
      error,
    );
  }
};

const deleteKodokanKata = async (id: number) => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/kodokan-katas/${id}`,
      {
        withCredentials: true,
      },
    );
  } catch (error) {
    console.error(
      "La technique n'a pas pu être supprimée dans la base de données",
      error,
    );
  }
};

const deleteTechniqueNote = async (id: number): Promise<string | null> => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/notes/techniques/${id}`,
      { withCredentials: true },
    );
    console.info("La note a été supprimée avec succès !");
    return null;
  } catch (error) {
    console.error(
      "La note n'a pas pu être supprimée dans la base de données",
      error,
    );
    return "La suppression de la note a échoué. Veuillez réessayer.";
  }
};

const deleteTwentyAttacksNote = async (id: number): Promise<string | null> => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/notes/twenty-attacks/${id}`,
      { withCredentials: true },
    );
    console.info("La note a été supprimée avec succès !");
    return null;
  } catch (error) {
    console.error(
      "La note n'a pas pu être supprimée dans la base de données",
      error,
    );
    return "La suppression de la note a échoué. Veuillez réessayer.";
  }
};

const deleteTwentyAttacksKata = async (id: number) => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/twenty-attacks-katas/${id}`,
      {
        withCredentials: true,
      },
    );
  } catch (error) {
    console.error(
      "La technique n'a pas pu être supprimée dans la base de données",
      error,
    );
  }
};

const postKodokanKata = async (
  newKata: NewKataData,
): Promise<PostKataResponse | null> => {
  try {
    const response = await axios.post<PostKataResponse>(
      `${import.meta.env.VITE_API_URL}/api/kodokan-katas`,
      newKata,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    console.error("La nouvelle technique n'a pas pu être créée", error);
    return null;
  }
};

const postKodokanNote = async (
  newNote: Omit<NoteData, "id">,
): Promise<PostTechniqueNoteResponse | null> => {
  try {
    const response = await axios.post<PostTechniqueNoteResponse>(
      `${import.meta.env.VITE_API_URL}/api/notes/kodokan`,
      newNote,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    console.error("La note n'a pas pu être créée", error);
    return null;
  }
};

const postLogin = async (credentials: Credentials) => {
  try {
    const response = await axios.post(
      "http://localhost:3310/api/login",
      credentials,
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status >= 400 && error.response.status < 500) {
        throw new Error(error.response.data.message || "Données invalides.");
      }
      return error.response.data;
    }
    console.error("Erreur lors de la connexion:", error);
    throw new Error("Une erreur est survenue, veuillez réessayer.");
  }
};

const postMember = async (
  newMember: NewMemberData,
): Promise<PostMemberAndLoginResponse | null> => {
  try {
    const response = await axios.post<PostMemberResponse>(
      `${import.meta.env.VITE_API_URL}/api/members`,
      newMember,
    );
    const loginResponse = await axios.post(
      "http://localhost:3310/api/login",
      { email: newMember.email, password: newMember.password },
      {
        withCredentials: true,
      },
    );
    return { member: response.data, login: loginResponse.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    console.error("Nous n'avons pas pu créer de compte", error);
    return null;
  }
};

const postTechnique = async (
  newTechnique: NewTechniqueData,
): Promise<PostTechniqueResponse | null> => {
  try {
    const response = await axios.post<PostTechniqueResponse>(
      `${import.meta.env.VITE_API_URL}/api/techniques`,
      newTechnique,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    console.error("La nouvelle technique n'a pas pu être créée", error);
    return null;
  }
};

const postTechniqueNote = async (
  newNote: Omit<NoteData, "id">,
): Promise<PostTechniqueNoteResponse | null> => {
  try {
    const response = await axios.post<PostTechniqueNoteResponse>(
      `${import.meta.env.VITE_API_URL}/api/notes/techniques`,
      newNote,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    console.error("La note n'a pas pu être créée", error);
    return null;
  }
};

const postTwentyAttacksKata = async (
  newKata: NewKataData,
): Promise<PostKataResponse | null> => {
  try {
    const response = await axios.post<PostKataResponse>(
      `${import.meta.env.VITE_API_URL}/api/twenty-attacks-katas`,
      newKata,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    console.error("La nouvelle technique n'a pas pu être créée", error);
    return null;
  }
};

const postTwentyAttacksNote = async (
  newNote: Omit<NoteData, "id">,
): Promise<PostTechniqueNoteResponse | null> => {
  try {
    const response = await axios.post<PostTechniqueNoteResponse>(
      `${import.meta.env.VITE_API_URL}/api/notes/twenty-attacks`,
      newNote,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    console.error("La note n'a pas pu être créée", error);
    return null;
  }
};

const putKodokanKata = async (id: string, editedKata: KataData) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/kodokan-katas/${id}`,
      editedKata,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    console.error("Erreur lors de la mise à jour.", error);
    return null;
  }
};

const putKodokanNote = async (noteId: number, editedNote: NoteData) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/notes/kodokan/${noteId}`,
      editedNote,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    console.error("La note n'a pas pu être modifiée", error);
    return null;
  }
};

const putMemberBeltId = async (member: MemberData) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/members/belt_id`,
      member,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    console.error("La ceinture n'a pas pu être modifiée", error);
    return null;
  }
};

const putMemberEmail = async (member: MemberData) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/members/email`,
      member,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    console.error("L'email n'a pas pu être modifié'", error);
    return null;
  }
};

const putMemberName = async (member: MemberData) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/members/name`,
      member,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    console.error("La nouvelle technique n'a pas pu être créée", error);
    return null;
  }
};

const putMemberPassword = async (member: MemberData) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/members/password`,
      member,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    console.error("La nouvelle technique n'a pas pu être créée", error);
    return null;
  }
};

const putTechnique = async (id: string, editedTechnique: TechniqueData) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/techniques/${id}`,
      editedTechnique,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    console.error("La technique n'a pas pu être modifiée.", error);
    return null;
  }
};

const putTechniqueNote = async (noteId: number, editedNote: NoteData) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/notes/techniques/${noteId}`,
      editedNote,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    console.error("La nouvelle technique n'a pas pu être créée", error);
    return null;
  }
};

const putTwentyAttacksKata = async (id: string, editedKata: KataData) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/twenty-attacks-katas/${id}`,
      editedKata,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    console.error("Erreur lors de la mise à jour.", error);
    return null;
  }
};

const putTwentyAttacksNote = async (noteId: number, editedNote: NoteData) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/notes/twenty-attacks/${noteId}`,
      editedNote,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    console.error("La nouvelle technique n'a pas pu être créée", error);
    return null;
  }
};

export {
  deleteKodokanKata,
  deleteKodokanNote,
  deleteTechnique,
  deleteTechniqueNote,
  deleteTwentyAttacksKata,
  deleteTwentyAttacksNote,
  postKodokanKata,
  postKodokanNote,
  postLogin,
  postMember,
  postTechnique,
  postTechniqueNote,
  postTwentyAttacksKata,
  postTwentyAttacksNote,
  putKodokanKata,
  putKodokanNote,
  putMemberBeltId,
  putMemberEmail,
  putMemberName,
  putMemberPassword,
  putTechnique,
  putTechniqueNote,
  putTwentyAttacksKata,
  putTwentyAttacksNote,
};
