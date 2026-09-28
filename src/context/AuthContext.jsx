  import {
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";

  import toast from "react-hot-toast";

  import api from "../services/api";

  /*
  =========================================================
  AUTH CONTEXT
  =========================================================
  */

  const AuthContext = createContext(null);

  /*
  =========================================================
  AUTH PROVIDER
  =========================================================
  */

  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    /*
    =======================================================
    STORE USER CONSISTENTLY
    =======================================================
    */

    const setAuthenticatedUser = (nextUser) => {
      if (!nextUser) {
        setUser(null);

        localStorage.removeItem(
          "orbit-user"
        );

        return null;
      }

      const normalizedUser = {
        ...nextUser,

        id:
          nextUser.id ||
          nextUser._id ||
          undefined,
      };

      setUser(normalizedUser);

      localStorage.setItem(
        "orbit-user",
        JSON.stringify(normalizedUser)
      );

      return normalizedUser;
    };

    /*
    =======================================================
    REFRESH CURRENT USER
    =======================================================
    */

    const refreshUser = async () => {
      const token =
        localStorage.getItem(
          "orbit-token"
        );

      if (!token) {
        setAuthenticatedUser(null);
        return null;
      }

      try {
        const res = await api.get(
          "/auth/me"
        );

        if (
          !res?.success ||
          !res?.user
        ) {
          throw new Error(
            res?.message ||
              "Session expired."
          );
        }

        return setAuthenticatedUser(
          res.user
        );
      } catch (error) {
        /*
        ---------------------------------------------------
        If the backend rejects the token,
        clear the local authentication state.
        ---------------------------------------------------
        */

        if (
          error?.status === 401
        ) {
          localStorage.removeItem(
            "orbit-token"
          );

          setAuthenticatedUser(
            null
          );
        }

        throw error;
      }
    };

    /*
    =======================================================
    CHECK EXISTING LOGIN
    =======================================================
    */

    useEffect(() => {
      let mounted = true;

      const checkSession =
        async () => {
          const token =
            localStorage.getItem(
              "orbit-token"
            );

          if (!token) {
            if (mounted) {
              setLoading(false);
            }

            return;
          }

          try {
            await refreshUser();
          } catch (error) {
            console.error(
              "Auth session refresh failed:",
              error
            );

            if (mounted) {
              localStorage.removeItem(
                "orbit-token"
              );

              localStorage.removeItem(
                "orbit-user"
              );

              setUser(null);
            }
          } finally {
            if (mounted) {
              setLoading(false);
            }
          }
        };

      checkSession();

      return () => {
        mounted = false;
      };
    }, []);

    /*
    =======================================================
    MANAGER SESSION HEARTBEAT
    =======================================================
    */

    useEffect(() => {
      if (
        !user ||
        user.role?.toLowerCase() !==
          "manager"
      ) {
        return undefined;
      }

      const sendHeartbeat =
        () => {
          api
            .post("/auth/heartbeat")
            .catch(() => {});
        };

      /*
      Send immediately.
      */

      sendHeartbeat();

      /*
      Then every 45 seconds.
      */

      const interval =
        window.setInterval(
          sendHeartbeat,
          45 * 1000
        );

      return () => {
        window.clearInterval(
          interval
        );
      };
    }, [
      user?.id,
      user?.role,
    ]);

    /*
    =======================================================
    LOGIN
    =======================================================
    */

    const login = async ({
      email,
      password,
    }) => {
      const cleanEmail =
        String(email || "")
          .trim()
          .toLowerCase();

      const cleanPassword =
        String(password || "");

      if (
        !cleanEmail ||
        !cleanPassword
      ) {
        throw new Error(
          "Email and password are required."
        );
      }

      const res =
        await api.post(
          "/auth/login",
          {
            email: cleanEmail,
            password:
              cleanPassword,
          },
          {
            auth: false,
          }
        );

      if (!res?.success) {
        throw new Error(
          res?.message ||
            "Invalid email or password."
        );
      }

      if (
        !res?.token ||
        !res?.user
      ) {
        throw new Error(
          "Login response is incomplete. Please try again."
        );
      }

      /*
      ---------------------------------------------------
      Clear previous session.
      ---------------------------------------------------
      */

      localStorage.removeItem(
        "orbit-token"
      );

      localStorage.removeItem(
        "orbit-user"
      );

      /*
      ---------------------------------------------------
      Save new session.
      ---------------------------------------------------
      */

      localStorage.setItem(
        "orbit-token",
        res.token
      );

      const authenticatedUser =
        setAuthenticatedUser(
          res.user
        );

      return authenticatedUser;
    };

    /*
    =======================================================
    REGISTER
    =======================================================
    */

    const register = async (
      formData
    ) => {
      const name =
        `${formData?.firstName || ""} ${
          formData?.lastName || ""
        }`.trim();

      const res =
        await api.post(
          "/auth/register",
          {
            name,

            email:
              formData?.email,

            password:
              formData?.password,

            mobile:
              formData?.mobile || "",
          },
          {
            auth: false,
          }
        );

      if (!res?.success) {
        throw new Error(
          res?.message ||
            "Registration failed."
        );
      }

      if (
        !res?.token ||
        !res?.user
      ) {
        throw new Error(
          "Registration response is incomplete. Please try again."
        );
      }

      localStorage.setItem(
        "orbit-token",
        res.token
      );

      const authenticatedUser =
        setAuthenticatedUser(
          res.user
        );

      return authenticatedUser;
    };

    /*
    =======================================================
    LOGOUT
    =======================================================
    */

    const logout = async () => {
      try {
        const token =
          localStorage.getItem(
            "orbit-token"
          );

        if (token) {
          await api.post(
            "/auth/logout"
          );
        }
      } catch (error) {
        /*
        ---------------------------------------------------
        Always clear local session even if
        backend logout fails.
        ---------------------------------------------------
        */

        console.error(
          "Logout request failed:",
          error
        );
      } finally {
        localStorage.removeItem(
          "orbit-token"
        );

        localStorage.removeItem(
          "orbit-user"
        );

        setUser(null);

        toast.success(
          "Logged out successfully."
        );
      }
    };

    /*
    =======================================================
    UPDATE PROFILE
    =======================================================
    */

    const updateProfile =
      async (data) => {
        const res =
          await api.put(
            "/auth/me",
            data
          );

        if (
          !res?.success ||
          !res?.user
        ) {
          throw new Error(
            res?.message ||
              "Couldn't update profile."
          );
        }

        const updatedUser =
          setAuthenticatedUser(
            res.user
          );

        return updatedUser;
      };

    /*
    =======================================================
    UPDATE PROFILE PICTURE
    =======================================================
    */

    const updateProfilePicture =
      async (file) => {
        if (!file) {
          throw new Error(
            "Please select a profile picture."
          );
        }

        const formData =
          new FormData();

        formData.append(
          "profilePicture",
          file
        );

        const res =
          await api.put(
            "/auth/profile-picture",
            formData,
            {
              isFormData: true,
            }
          );

        if (
          !res?.success ||
          !res?.user
        ) {
          throw new Error(
            res?.message ||
              "Couldn't update profile picture."
          );
        }

        const updatedUser =
          setAuthenticatedUser(
            res.user
          );

        return updatedUser;
      };

    /*
    =======================================================
    REMOVE PROFILE PICTURE
    =======================================================
    */

    const removeProfilePicture =
      async () => {
        const res =
          await api.delete(
            "/auth/profile-picture"
          );

        if (
          !res?.success ||
          !res?.user
        ) {
          throw new Error(
            res?.message ||
              "Couldn't remove profile picture."
          );
        }

        const updatedUser =
          setAuthenticatedUser(
            res.user
          );

        return updatedUser;
      };

    /*
    =======================================================
    AUTH HELPERS
    =======================================================
    */

    const isAuthenticated =
      Boolean(user);

    const isAdmin =
      user?.role?.toLowerCase() ===
      "admin";

    const isManager =
      user?.role?.toLowerCase() ===
      "manager";

    const isStaff =
      isAdmin || isManager;

    /*
    =======================================================
    CONTEXT VALUE
    =======================================================
    */

    const value = {
      /*
      User
      */
      user,

      /*
      Loading
      */
      loading,

      /*
      Authentication actions
      */
      login,
      register,
      logout,

      /*
      Profile actions
      */
      updateProfile,
      updateProfilePicture,
      removeProfilePicture,

      /*
      Session
      */
      refreshUser,

      /*
      Role helpers
      */
      isAuthenticated,
      isAdmin,
      isManager,
      isStaff,
    };

    /*
    =======================================================
    PROVIDER
    =======================================================
    */

    return (
      <AuthContext.Provider
        value={value}
      >
        {!loading &&
          children}
      </AuthContext.Provider>
    );
  };

  /*
  =========================================================
  useAuth HOOK
  =========================================================
  */

  export const useAuth = () => {
    const context =
      useContext(
        AuthContext
      );

    if (!context) {
      throw new Error(
        "useAuth must be used inside an AuthProvider."
      );
    }

    return context;
  };

  /*
  =========================================================
  BACKWARD-COMPATIBLE HOOK NAME
  =========================================================
  */

  export const useAuthContext =
    useAuth;

  /*
  =========================================================
  DEFAULT EXPORT
  =========================================================
  */

  export default AuthContext;