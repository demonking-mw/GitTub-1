"use client";

import { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";

export function Login() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Prevents SSR mismatch by rendering nothing initially

  return (
    <div id="authButton">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
}
