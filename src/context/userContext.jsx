import { createContext, useState, useEffect } from "react";
import axiosInstance from "../utilities/axiosInstance";
import { API_PATHS } from "../utilities/apiPaths";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // state to track loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) return;

    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(res.data);
      } catch (err) {
        console.error("User not authenticated", err);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    // Save token to storage
    localStorage.setItem("token", userData.token);
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <userContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </userContext.Provider>
  );
};

// export default UserProvider;
