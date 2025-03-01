import RegistrationForm from "@/components/landing/RegistrationForm";

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4">
        Formulir Pendaftaran
      </h1>
      <div>
        <RegistrationForm />
      </div>
    </>
  );
}
