import SignupForm from "@/components/authentication/SignupForm";

export const metadata = {
  title: "Sign Up - Bogdan's Driving School | Create Your Account",
  description: "Join Bogdan's Driving School today! Create your account to book driving lessons, track your progress, and start your journey to becoming a confident driver. Professional instruction in South London.",
  keywords: "driving school signup, register, create account, driving lessons registration, Bogdan driving school, new student signup, driving instructor signup",
  openGraph: {
    title: "Sign Up - Bogdan's Driving School",
    description: "Join our driving school and start your journey to becoming a confident driver. Professional instruction with over 15 years of experience.",
    type: "website",
  },
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Your Account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Join Bogdan's Driving School to start your driving journey
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}