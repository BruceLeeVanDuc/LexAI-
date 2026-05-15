import type { AuthResponse, ChatSession, SendMessageResponse, User } from "./types";
import { getToken, clearToken } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((init?.headers as Record<string, string>) || {}),
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...init, headers });

  if (res.status === 401) {
    clearToken();
    if (typeof window !== "undefined") window.location.href = "/login";
    throw new Error("Phiên đăng nhập đã hết hạn");
  }

  if (!res.ok) {
    let msg = `API ${res.status}`;
    try {
      const j = await res.json();
      msg = j.message || j.error || msg;
    } catch {
      // ignore
    }
    throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
  }
  return res.json();
}

export const api = {
  // Auth
  register: (email: string, password: string, fullName?: string) =>
    request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, fullName }),
    }),

  login: (email: string, password: string) =>
    request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  me: () => request<User>("/auth/me"),

  changePassword: (currentPassword: string, newPassword: string) =>
    request<{ success: boolean }>("/auth/password", {
      method: "PATCH",
      body: JSON.stringify({ currentPassword, newPassword }),
    }),

  // Chat
  sendMessage: (question: string, sessionId?: number) =>
    request<SendMessageResponse>("/chat", {
      method: "POST",
      body: JSON.stringify({ question, sessionId }),
    }),

  // Sessions
  listSessions: () => request<ChatSession[]>("/sessions"),
  getSession: (id: number) => request<ChatSession>(`/sessions/${id}`),
  deleteSession: (id: number) =>
    request<{ deleted: boolean }>(`/sessions/${id}`, { method: "DELETE" }),
};
