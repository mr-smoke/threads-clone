import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  user: null,
  setUser: () => {},
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user/getAuthUser", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
