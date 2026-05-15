"use client";

import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { api } from "@/lib/api";
import { setToken, setStoredUser } from "@/lib/auth";

export default function RegisterPage() {
  const router = useRouter();

  async function handleRegister(data: {
    email: string;
    password: string;
    fullName?: string;
  }) {
    const res = await api.register(data.email, data.password, data.fullName);
    setToken(res.token);
    setStoredUser(res.user);
    router.push("/");
  }

  return <AuthForm mode="register" onSubmit={handleRegister} />;
}
