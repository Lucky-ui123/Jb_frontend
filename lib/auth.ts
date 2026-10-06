/**
 * LIGHTWEIGHT FRONTEND DESIGN AUTHENTICATION
 * Provides safe design-preview states (Anonymous / Logged-in Alex Morgan)
 * with zero production backend dependency, no secrets, and no real credentials.
 */
import { MOCK_USER } from "@/mock-data/auth";

export interface MockAuthUser {
  id: string;
  email?: string;
  user_metadata?: Record<string, any>;
  aud?: string;
  role?: string;
  created_at?: string;
}

// Client-side mock auth provider
export function getBrowserSupabaseClient() {
  return {
    auth: {
      async getUser() {
        return { data: { user: MOCK_USER as unknown as MockAuthUser }, error: null };
      },
      onAuthStateChange(callback: (event: string, session: { user: MockAuthUser } | null) => void) {
        callback("SIGNED_IN", { user: MOCK_USER as unknown as MockAuthUser });
        return {
          data: {
            subscription: {
              unsubscribe() {},
            },
          },
        };
      },
      async signOut() {
        console.log("[Design Preview] User signed out (Simulated)");
        return { error: null };
      },
    },
  };
}

export async function signInWithGoogle(redirectTo?: string) {
  console.log("[Design Preview] Simulated Google sign-in. Target:", redirectTo || "/");
  return { data: { url: null }, error: null };
}

export async function signOutUser() {
  console.log("[Design Preview] Simulated sign-out");
  return { error: null };
}

// Server Component helper
export async function getCurrentUser(): Promise<MockAuthUser | null> {
  return MOCK_USER as unknown as MockAuthUser;
}
