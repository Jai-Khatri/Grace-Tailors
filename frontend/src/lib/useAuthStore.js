import { create } from "zustand";
import axiosInstance from "./axios.js";

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,

    login: async (data) => {
        try {
            const res = await axiosInstance.post("/api/admin", data);
            set({ user: res.data, isAuthenticated: true, error: null }); 
        } catch (error) {
            console.log("Error in login controller at Auth Store", error.message);
            set({ user: null, isAuthenticated: false, error: error.response?.data?.message || "Login failed." });
        }
    },
}));

export default useAuthStore;
