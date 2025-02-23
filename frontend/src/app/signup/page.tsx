import SignupForm from "../signup/signup-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-md mt-12">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Sign up for your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            or{" "}
            <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              sign in ASAP if you already have one!
            </a>
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}

