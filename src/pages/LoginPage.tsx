import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import { Toaster } from "@/components/ui/toaster";

const LoginPage = () => {
  return (
    <AuthLayout
      title="30-Day Challenge Tracker"
      subtitle="Sign in to your account to continue your journey"
    >
      <LoginForm />
      <Toaster />
    </AuthLayout>
  );
};

export default LoginPage;
