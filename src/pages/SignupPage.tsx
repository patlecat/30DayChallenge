import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";
import { Toaster } from "@/components/ui/toaster";

const SignupPage = () => {
  return (
    <AuthLayout
      title="30-Day Challenge Tracker"
      subtitle="Create an account to start tracking your challenges"
    >
      <SignupForm />
      <Toaster />
    </AuthLayout>
  );
};

export default SignupPage;
