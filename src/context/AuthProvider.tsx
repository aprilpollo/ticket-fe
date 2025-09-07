import { createContext, useContext, useState, useEffect } from "react";
import { TokenManager } from "@/context/TokenManager";
import { useLoader } from "@/context/LoaderProvider";
import api from "@/lib/api";

import type { ReactNode } from "react";
import type { User } from "@/types/user";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  SignIn: (credentials: { email: string; password: string }) => Promise<void>;
  SignUp: (credentials: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    display_name: string;
  }) => Promise<void>;
  GoogleLogin: (code: string) => Promise<void>;
  SignOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const { setLoader, loader } = useLoader();
  const token = TokenManager.getToken();

  useEffect(() => {
    setLoader(true);
    try {
      UserInfo();
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setTimeout(() => setLoader(false), 2000);
    }
  }, []);

  const SignIn = async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post("/auth/login", credentials);
      const { data } = response;
      TokenManager.setToken(data.data.token);
      setUser(data.data.user);
    } catch (error) {
      throw error;
    }
  };

  const SignUp = async (credentials: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    display_name: string;
  }) => {
    try {
      const response = await api.post("/auth/register", credentials);
      const { data } = response;
      TokenManager.setToken(data.data.token);
      setUser(data.data.user);
    } catch (error) {
      throw error;
    }
  };

  const SignOut = () => {
    TokenManager.removeToken();
    setUser(null);
  };

  const UserInfo = async () => {
    try {
      if (token) {
        const response = await api.get("/auth/userinfo");
        const { data } = response;
        TokenManager.setToken(data.data.token);
        setUser(data.data.user);
      }
    } catch (error) {
      TokenManager.removeToken();
      setUser(null);
    }
  };

  const GoogleLogin = async (code: string) => {
    try {
      const response = await api.post("/auth/google/callback", { code });
      const { data } = response;
      TokenManager.setToken(data.data.token);
      setUser(data.data.user);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, SignIn, SignUp, SignOut, GoogleLogin }}
    >
      {!loader && children}
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
