"use client";

import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { api } from "@/lib/api";
import { setToken, setStoredUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  async function handleLogin(data: { email: string; password: string }) {
    const res = await api.login(data.email, data.password);
    setToken(res.token);
    setStoredUser(res.user);
    router.push("/");
  }

  return <AuthForm mode="login" onSubmit={handleLogin} />;
}
