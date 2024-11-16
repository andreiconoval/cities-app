import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  ReactNode,
} from "react";
import { auth } from "@/firebase/firebaseClient";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

// Define the context type
interface AuthContextType {
  user: User | null;
  signin: (email: string, password: string) => Promise<User | null>;
  signup: (email: string, password: string) => Promise<User | null>;
  signout: () => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Props
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider Component
export function AuthProvider({ children }: AuthProviderProps) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Hook to access AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Custom Hook for providing auth logic
function useProvideAuth(): AuthContextType {
  const [user, setUser] = useState<User | null>(null);

  const signin = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      setUser(response.user);
      return response.user;
    } catch (error) {
      console.error("Error signing in:", error);
      return null;
    }
  };

  const signup = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(response.user);
      return response.user;
    } catch (error) {
      console.error("Error signing up:", error);
      return null;
    }
  };

  const signout = async (): Promise<void> => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return {
    user,
    signin,
    signup,
    signout,
  };
}
