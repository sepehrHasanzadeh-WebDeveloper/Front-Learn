"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, Loading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        Loading(true);
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });
        const data = await res.json();

        if (data.success && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching User", error);
        setUser(null);
      } finally {
        Loading(false);
      }
    };
    fetchUser();
  }, []);

  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (data.success) {
        setUser(null);
        toast.success("با موفقیت خارج شدید");
        router.push("/");
      } else {
        toast.error("خطا در خروج از حساب ");
      }
    } catch (error) {
      console.error("Logout error", error);
      toast.error("خطایی رح داد");
    }
  };

  const refreshUser = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });
      const data = await res.json();

      if (data.success && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching User", error);
      setUser(null);
    }
  };

  const value = {
    user,
    setUser,
    loading,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
