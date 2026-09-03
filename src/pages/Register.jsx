import RegisterForm from "../components/Auth/RegisterForm";
import AuthLayout from "../components/Auth/AuthLayout";

const Register = () => {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join Orbit Buy to experience premium fashion, fast delivery, and exclusive rewards."
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;