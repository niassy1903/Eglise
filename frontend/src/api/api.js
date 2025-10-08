import axios from "axios";

// Création d'une instance Axios pour toute l'application
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // URL de ton backend Laravel
  headers: {
    "Content-Type": "application/json",
  },
});

// ----------------- UTILISATEURS -----------------

export const getUtilisateurs = () => api.get("/utilisateurs");
export const getUtilisateur = (id) => api.get(`/utilisateurs/${id}`);
export const createUtilisateur = (data) => api.post("/utilisateurs", data);
export const updateUtilisateur = (id, data) => api.put(`/utilisateurs/${id}`, data);
export const deleteUtilisateur = (id) => api.delete(`/utilisateurs/${id}`);

// ----------------- LOGIN -----------------

export const login = (email, mot_de_passe) => {
  return api.post("/login", { email, mot_de_passe });
};

// ----------------- MARIAGE -----------------

export const getMariages = () => api.get("/mariages");
export const getMariage = (id) => api.get(`/mariages/${id}`);
export const createMariage = (data) => api.post("/mariages", data);
export const updateMariage = (id, data) => api.put(`/mariages/${id}`, data);
export const deleteMariage = (id) => api.delete(`/mariages/${id}`);

// ----------------- NAISSANCE -----------------

export const getNaissances = () => api.get("/naissances");
export const getNaissance = (id) => api.get(`/naissances/${id}`);
export const createNaissance = (data) => api.post("/naissances", data);
export const updateNaissance = (id, data) => api.put(`/naissances/${id}`, data);
export const deleteNaissance = (id) => api.delete(`/naissances/${id}`);

// ----------------- DECES -----------------

export const getDeces = () => api.get("/deces");
export const getDecesById = (id) => api.get(`/deces/${id}`);
export const createDeces = (data) => api.post("/deces", data);
export const updateDeces = (id, data) => api.put(`/deces/${id}`, data);
export const deleteDeces = (id) => api.delete(`/deces/${id}`);


// ----------------- STATISTIQUES / COMPTES -----------------

// ----------------- UTILISATEURS -----------------
export const countAdmins = () => api.get("/count/admins");
export const countPretres = () => api.get("/count/pretres");
export const statsUtilisateurs = () => api.get("/stats/utilisateurs");

// ----------------- NAISSANCES -----------------
export const countNaissances = () => api.get("/count/naissances");
export const statsNaissances = () => api.get("/stats/naissances");

// ----------------- MARIAGES -----------------
export const countMariages = () => api.get("/count/mariages");
export const statsMariages = () => api.get("/stats/mariages");

// ----------------- DECES -----------------
export const countDeces = () => api.get("/count/deces");
export const statsDeces = () => api.get("/stats/deces");

// Export de l'instance pour requêtes personnalisées si nécessaire
export default api;
