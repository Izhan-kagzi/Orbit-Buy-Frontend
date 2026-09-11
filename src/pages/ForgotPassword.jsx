import ForgotPasswordForm from "../components/Auth/ForgotPasswordForm";
import AuthLayout from "../components/Auth/AuthLayout";

const ForgotPassword = () => {
  return (
    <AuthLayout
      title="Recover Account"
      subtitle="Enter your email to receive a password reset link and regain access to your account."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;