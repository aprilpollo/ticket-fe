export const TokenManager = {
  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token");
    }
    return null;
  },

  setToken: (token: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
      document.cookie = `auth_token=${token}; path=/; max-age=${
        60 * 60 * 24 * 7
      }; samesite=strict${
        import.meta.env.VITE_NODE_ENV === "production" ? "; secure" : ""
      }`;
    }
  },

  removeToken: (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      document.cookie =
        "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  },
};
