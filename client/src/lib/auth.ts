import { apiRequest } from "./queryClient";
import type { User, InsertUser } from "@shared/schema";

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
}

export async function login(data: LoginData): Promise<User> {
  const response = await apiRequest("POST", "/api/auth/login", data);
  const result: AuthResponse = await response.json();
  return result.user;
}

export async function register(data: InsertUser): Promise<User> {
  const response = await apiRequest("POST", "/api/auth/register", data);
  const result: AuthResponse = await response.json();
  return result.user;
}

export async function updateProfile(id: string, data: Partial<User>): Promise<User> {
  const response = await apiRequest("PATCH", `/api/users/${id}`, data);
  return await response.json();
}
