// Client / src / pages / Admin / AdminLoginPage / View / AdminLoginPage.jsx
import { useState } from "react";
import { useAppContext } from "../../context/appContext";
import { loginAdmin } from "../Services/AdminLoginPageServices";
import AdminLoginBrand from "../Components/AdminLoginBrand";
import AdminLoginForm from "../Components/AdminLoginForm";

const AdminLoginPage = () => {
  const { navigate } = useAppContext();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const data = await loginAdmin(form);

      if (data.token) {
        localStorage.setItem("adminToken", data.token);
      }

      navigate("/admin/dashboard");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto min-h-screen bg-[#fafafa] flex items-center justify-center px-4 py-6 sm:p-6 text-slate-800 tracking-tight font-sans">
      <div className="w-full max-w-5xl bg-white rounded-[20px] sm:rounded-[28px] lg:rounded-4xl border border-slate-100 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col lg:flex-row">
        <AdminLoginBrand />

        <AdminLoginForm
          form={form}
          setForm={setForm}
          loading={loading}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AdminLoginPage;
