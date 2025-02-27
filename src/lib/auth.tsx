import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsAuthenticated(isLoggedIn);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo purposes, we'll just simulate a successful login
    // In a real app, you would use Supabase auth or similar
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem("isLoggedIn", "true");
        setIsAuthenticated(true);
        resolve(true);
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsAuthenticated(false);
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    // For demo purposes, we'll just simulate a successful signup
    // In a real app, you would use Supabase auth or similar
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, you would create the user in the database
        // and then log them in
        resolve(true);
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
