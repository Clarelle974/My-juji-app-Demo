import axios from "axios";

const getBelts = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/belts`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getCategories = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/categories`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getKodokanKatasByBelt = (searchParams: URLSearchParams) => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/kodokan-katas/belts/`, {
      params: Object.fromEntries(searchParams),
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getKodokanKatasDetails = (id: string) => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/kodokan-katas/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getKodokanNotesByMember = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/notes/kodokan`, {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getMemberDetails = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/members/profile`, {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getSearchedTechniques = (searchedTechnique: string) => {
  return axios
    .get(
      `${import.meta.env.VITE_API_URL}/api/techniques/search/${searchedTechnique}`,
    )
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getTechniqueDetails = (id: string) => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/techniques/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};
const getTechniqueNote = (techniqueId: string) => {
  return axios
    .get(
      `${import.meta.env.VITE_API_URL}/api/notes/techniques/${techniqueId}`,
      { withCredentials: true },
    )
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getTechniques = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/techniques`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getTechniquesByCategory = (
  slug: string,
  searchParams: URLSearchParams,
) => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/techniques/category/${slug}`, {
      params: Object.fromEntries(searchParams),
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getTechniquesByBelt = (searchParams: URLSearchParams) => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/techniques/belts/`, {
      params: Object.fromEntries(searchParams),
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getTwentyAttacksKatasByBelt = (searchParams: URLSearchParams) => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/twenty-attacks-katas/belts/`, {
      params: Object.fromEntries(searchParams),
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
};
const getTwentyAttacksKatasDetails = (id: string) => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/twenty-attacks-katas/${id}`)
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

const getTwentyAttacksNotesByMember = () => {
  return axios
    .get(`${import.meta.env.VITE_API_URL}/api/notes/twenty-attacks`, {
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

export {
  getBelts,
  getCategories,
  getKodokanKatasByBelt,
  getKodokanKatasDetails,
  getKodokanNotesByMember,
  getMemberDetails,
  getSearchedTechniques,
  getTechniqueDetails,
  getTechniqueNote,
  getTechniques,
  getTechniquesByCategory,
  getTechniquesByBelt,
  getTwentyAttacksKatasByBelt,
  getTwentyAttacksKatasDetails,
  getTwentyAttacksNotesByMember,
};
