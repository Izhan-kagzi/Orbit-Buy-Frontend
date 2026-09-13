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

  // =====================================================
  // CHECK EXISTING LOGIN
  // =====================================================

  useEffect(() => {
    const token = localStorage.getItem("orbit-token");

    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/auth/me")
      .then((res) => {
        if (!res?.success || !res?.user) {
          throw new Error("Session expired.");
        }

        setUser(res.user);
        localStorage.setItem("orbit-user", JSON.stringify(res.user));
      })
      .catch(() => {
        localStorage.removeItem("orbit-token");
        localStorage.removeItem("orbit-user");
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // =====================================================
  // LOGIN
  // =====================================================

  const login = async ({ email, password }) => {
    const cleanEmail = String(email || "").trim().toLowerCase();
    const cleanPassword = String(password || "");

    if (!cleanEmail || !cleanPassword) {
      throw new Error("Email and password are required.");
    }

    const res = await api.post(
      "/auth/login",
      {
        email: cleanEmail,
        password: cleanPassword,
      },
      {
        auth: false,
      }
    );

    // IMPORTANT:
    // api.js returns { success:false, message }
    // instead of throwing on backend errors.
    if (!res?.success) {
      throw new Error(res?.message || "Invalid email or password.");
    }

    if (!res.token || !res.user) {
      throw new Error("Login response is incomplete. Please try again.");
    }

    // Clear any old session first
    localStorage.removeItem("orbit-token");
    localStorage.removeItem("orbit-user");

    // Save new session
    localStorage.setItem("orbit-token", res.token);
    localStorage.setItem("orbit-user", JSON.stringify(res.user));

    setUser(res.user);

    return res.user;
  };

  // =====================================================
  // REGISTER
  // =====================================================

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
      {
        auth: false,
      }
    );

    if (!res?.success) {
      throw new Error(res?.message || "Registration failed.");
    }

    if (!res.token || !res.user) {
      throw new Error(
        "Registration response is incomplete. Please try again."
      );
    }

    localStorage.setItem("orbit-token", res.token);
    localStorage.setItem("orbit-user", JSON.stringify(res.user));

    setUser(res.user);

    return res.user;
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = () => {
    localStorage.removeItem("orbit-token");
    localStorage.removeItem("orbit-user");

    setUser(null);

    toast.success("Logged out successfully.");
  };

  // =====================================================
  // UPDATE PROFILE
  // =====================================================

  const updateProfile = async (data) => {
    const res = await api.put("/auth/me", data);

    if (!res?.success || !res?.user) {
      throw new Error(res?.message || "Couldn't update profile.");
    }

    setUser(res.user);

    localStorage.setItem(
      "orbit-user",
      JSON.stringify(res.user)
    );

    toast.success("Profile updated.");

    return res.user;
  };

  // =====================================================
  // AUTH HELPERS
  // =====================================================

  const isAuthenticated = Boolean(user);

  const isAdmin = user?.role?.toLowerCase() === "admin";

  const isManager =
    user?.role?.toLowerCase() === "manager";

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

// =====================================================
// HOOK
// =====================================================

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;