

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GOOGLE_OAUTH_URL: string = import.meta.env.VITE_GOOGLE_OAUTH_URL || "";
const GOOGLE_GSI_URL: string = import.meta.env.VITE_GOOGLE_GSI_URL || "";
const GOOGLE_CLIENT_ID: string = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
const GOOGLE_REDIRECT_URI: string =
  import.meta.env.VITE_GOOGLE_REDIRECT_URI || "";

declare global {
  interface Window {
    google?: any;
  }
}

export function GoogleAuth() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = GOOGLE_GSI_URL;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  const handleGoogleLogin = () => {
    if (
      !window.google ||
      !window.google.accounts ||
      !window.google.accounts.id
    ) {
      console.error("Google API not loaded");
      return;
    }

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (res: any) => {
        console.log("Google ID Token:", res.credential);
      },
    });

    window.google.accounts.id.prompt();
  };

  return (
    <Button
      variant="outline"
      type="button"
      className="w-full flex items-center gap-2"
      onClick={handleGoogleLogin}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={20}
        height={20}
        className="mr-2"
      >
        <path
          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
          fill="currentColor"
        />
      </svg>
    </Button>
  );
}

export function GoogleAuthSDK() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log("Credential:", credentialResponse);
          // ส่ง credentialResponse.credential ไป backend เพื่อตรวจสอบ token
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </GoogleOAuthProvider>
  );
}

export function GoogleAuthRedirect() {
  const handleGoogleLogin = () => {
    const oauthUrl =
      GOOGLE_OAUTH_URL +
      new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: GOOGLE_REDIRECT_URI,
        response_type: "code",
        scope: "openid email profile",
        access_type: "offline",
        // prompt: "consent",
      }).toString();

    window.location.href = oauthUrl;
  };

  return (
    <Button
      variant="outline"
      type="button"
      className="w-full flex items-center gap-2 cursor-pointer"
      onClick={handleGoogleLogin}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={20}
        height={20}
        className="mr-2"
      >
        <path
          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
          fill="currentColor"
        />
      </svg>
    </Button>
  );
}
