// src/components/GoogleAuth.tsx
import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

interface UserDetails {
  email: string;
  name: string;
  picture: string;
}

export const GoogleAuth: React.FC = () => {
  // Handle successful login response
  const handleSuccess = (response: CredentialResponse) => {
    const token = response.credential;
    if (token) {
      // Decode the ID token
      const userData: UserDetails = jwtDecode<UserDetails>(token);
      console.log("Decoded User Info:", userData);
    }
  };

  // Handle failed login
  const handleFailure = () => {
    console.error("Google Login Failed");
  };

  // Fetch user details using the Google API with the token
  const fetchUserDetails = async (token: string) => {
    try {
      // Send a request to the Google API to fetch user profile data
      const userResponse = await fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`,
      );
      const userData: UserDetails = await userResponse.json();

      console.log("User Info:", userData);
      // userData contains the email, name, and picture
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess} // Correctly typed callback for success
        onError={handleFailure} // Correctly typed callback for failure
        useOneTap // Enables one-tap login
      />
    </div>
  );
};
