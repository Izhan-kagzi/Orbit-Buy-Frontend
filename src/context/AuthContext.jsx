import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, if a token is saved, verify it against the backend
  // and load the current user. This also catches expired/invalid
  // tokens left over from a previous session.
  useEffect(() => {
    const token = localStorage.getItem("orbit-token");

    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/auth/me")
      .then((res) => setUser(res.user))
      .catch(() => {
        localStorage.removeItem("orbit-token");
        localStorage.removeItem("orbit-user");
      })
      .finally(() => setLoading(false));
  }, []);

  // ---------------- Login ----------------

  const login = async ({ email, password }) => {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const res = await api.post(
      "/auth/login",
      { email, password },
      { auth: false }
    );

    localStorage.setItem("orbit-token", res.token);
    localStorage.setItem("orbit-user", JSON.stringify(res.user));
    setUser(res.user);

    return res.user;
  };

  // ---------------- Register ----------------

  const register = async (formData) => {
    const name = `${formData.firstName || ""} ${
      formData.lastName || ""
    }`.trim();

    const res = await api.post(
      "/auth/register",
      {
        name,
        email: formData.email,
        password: formData.password,
        mobile: formData.mobile,
      },
      { auth: false }
    );

    localStorage.setItem("orbit-token", res.token);
    localStorage.setItem("orbit-user", JSON.stringify(res.user));
    setUser(res.user);

    return res.user;
  };

  // ---------------- Logout ----------------

  const logout = () => {
    localStorage.removeItem("orbit-token");
    localStorage.removeItem("orbit-user");

    setUser(null);

    toast.success("Logged out successfully.");
  };

  // ---------------- Update User ----------------

  const updateProfile = async (data) => {
    const res = await api.put("/auth/me", data);

    setUser(res.user);
    localStorage.setItem("orbit-user", JSON.stringify(res.user));

    toast.success("Profile updated.");
    return res.user;
  };

  // ---------------- Helpers ----------------

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";
  const isManager = user?.role === "manager";
  const isStaff = isAdmin || isManager;

  const value = {
    user,
    loading,

    login,
    register,
    logout,
    updateProfile,

    isAuthenticated,
    isAdmin,
    isManager,
    isStaff,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ---------------- Hook ----------------

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
