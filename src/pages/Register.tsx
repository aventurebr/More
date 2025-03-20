
import React from "react";
import AuthPageLayout from "@/components/auth/AuthPageLayout";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <AuthPageLayout 
      title="Crie sua conta"
      description="Cadastre-se para encontrar o quarto perfeito em Campinas"
    >
      <RegisterForm />
    </AuthPageLayout>
  );
};

export default Register;
