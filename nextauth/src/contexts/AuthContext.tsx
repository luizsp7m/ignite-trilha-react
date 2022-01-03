import Router from "next/router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { setCookie, parseCookies, destroyCookie } from "nookies";

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  isAuthenticated: boolean;
  user: User;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  email: string;
  permissions: string[];
  roles: string[];
}

export function signOut() {
  destroyCookie(undefined, "nextauth.token");
  destroyCookie(undefined, "nextauth.refreshToken");

  Router.push("/");
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/sessions", {
        email,
        password
      });

      const { token, refreshToken, permissions, roles } = response.data;

      setUser({
        email,
        permissions,
        roles,
      });

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: "/",
      });

      setCookie(undefined, "nextauth.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 dias
        path: "/",
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      Router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    try {
      const { "nextauth.token": token } = parseCookies();

      if (token) {
        api.get("/me", {}).then(response => {
          const { email, permissions, roles } = response.data;

          setUser({ email, permissions, roles });
        });
      }

    } catch (error) {
      signOut();
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      signIn,
      isAuthenticated,
      user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}