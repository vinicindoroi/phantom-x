import { User } from "@/types";

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: string;
}

// In-memory/client-safe auth state helper
const DEFAULT_USER: User = {
  id: "usr_admin_01",
  name: "Engenheiro Operações",
  email: "admin@phantomx.pro",
  role: "admin",
  organizationId: "org_phantom_main",
  organizationName: "Phantom-X Intelligence Lab",
  createdAt: new Date().toISOString(),
};

export const auth = {
  // Get active session from localStorage (client side)
  getSession(): AuthSession | null {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem("phantom_session") || localStorage.getItem("nexora_session");
      if (!stored) {
        // Return default demo session if none set to facilitate immediate dashboard preview
        const demoSession: AuthSession = {
          user: DEFAULT_USER,
          token: "jwt_token_demo_phantom_production",
          expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
        };
        localStorage.setItem("phantom_session", JSON.stringify(demoSession));
        return demoSession;
      }
      return JSON.parse(stored);
    } catch {
      return null;
    }
  },

  login(email: string, _password?: string): AuthSession {
    const session: AuthSession = {
      user: {
        id: `usr_${Date.now().toString(36)}`,
        name: email.split("@")[0].replace(/[^a-zA-Z0-9]/g, " "),
        email,
        role: "admin",
        organizationId: "org_primary",
        organizationName: "Workspace Principal",
        createdAt: new Date().toISOString(),
      },
      token: `token_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("phantom_session", JSON.stringify(session));
      // Set secure cookie simulation for middleware/routing
      document.cookie = `phantom_token=${session.token}; path=/; max-age=604800; SameSite=Lax`;
    }
    return session;
  },

  signup(name: string, email: string): AuthSession {
    const session: AuthSession = {
      user: {
        id: `usr_${Date.now().toString(36)}`,
        name,
        email,
        role: "admin",
        organizationId: `org_${Date.now().toString(36)}`,
        organizationName: `${name.split(" ")[0]}'s Lab`,
        createdAt: new Date().toISOString(),
      },
      token: `token_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("phantom_session", JSON.stringify(session));
      document.cookie = `phantom_token=${session.token}; path=/; max-age=604800; SameSite=Lax`;
    }
    return session;
  },

  logout(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("phantom_session");
      localStorage.removeItem("nexora_session");
      document.cookie = "phantom_token=; path=/; max-age=0";
      document.cookie = "nexora_token=; path=/; max-age=0";
    }
  },
};
