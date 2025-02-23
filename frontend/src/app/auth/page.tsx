"use client";

import { signIn } from "next-auth/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { WaterDrops } from "@/components/waterdrops";
import { Login } from "@/components/login";

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export default function LoginPage() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="bg-light-blue relative flex min-h-screen items-center justify-center overflow-hidden">
        <WaterDrops />
        <div className="z-10 w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
            Sign up or Log in to GitTub with Google
          </h1>
          <Login />
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
