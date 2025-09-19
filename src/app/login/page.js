import LoginForm from "@/components/authentication/LoginForm";

export const metadata = {
  title: "Login - Bogdan's Driving School | Sign In to Your Account",
  description: "Sign in to your Bogdan's Driving School account to book lessons, track progress, and access your driving journey. Secure login with email or Google.",
  keywords: "driving school login, sign in, driving lessons account, Bogdan driving school, student portal, lesson booking login",
  openGraph: {
    title: "Login - Bogdan's Driving School",
    description: "Sign in to your driving school account to continue your journey to becoming a confident driver.",
    type: "website",
  },
};

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome Back
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue your driving journey
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
