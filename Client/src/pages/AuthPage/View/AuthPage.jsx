// Client / src / pages / AuthPage / View / AuthPage.jsx
import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/appContext";
import {
  loginUser,
  registerUser,
  sendRegistrationOtp,
  verifyRegistrationEmailOtp,
} from "../Services/AuthPageServices";
import AuthBranding from "../Components/AuthBranding";
import AuthForm from "../Components/AuthForm";
import LegalLinks from "../../../components/LegalLinks";

const initialForm = {
  name: "",
  email: "",
  password: "",
  businessName: "",
  emailOtp: "",
};

const AuthPage = () => {
  const { navigate, location } = useAppContext();

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSentTo, setOtpSentTo] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpCooldown, setOtpCooldown] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const isRegister = mode === "register";

  const handleModeChange = () => {
    setMode(isRegister ? "login" : "register");
    setForm(initialForm);
    setOtpSentTo("");
    setOtpVerified(false);
    setOtpCooldown(0);
    setShowPassword(false);
  };

  const fromLocation = location.state?.from;

  const redirectTo = fromLocation
    ? `${fromLocation.pathname}${fromLocation.search || ""}`
    : "/profile";

  useEffect(() => {
    if (otpCooldown <= 0) return;

    const interval = setInterval(() => {
      setOtpCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [otpCooldown]);

  const handleChange = async (event) => {
    const { name, value } = event.target;
    if (name === "emailOtp") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 6);
      setForm((prev) => ({ ...prev, emailOtp: digitsOnly }));

      if (otpVerified) setOtpVerified(false);

      if (digitsOnly.length === 6 && form.email) {
        try {
          await verifyRegistrationEmailOtp({
            email: form.email,
            emailOtp: digitsOnly,
          });

          setOtpVerified(true);
        } catch {
          setOtpVerified(false);
        }
      }

      return;
    }

    if (name === "email") {
      setOtpVerified(false);
      setOtpSentTo("");
      setForm((prev) => ({
        ...prev,
        email: value,
        emailOtp: "",
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendOtp = async () => {
    if (!form.email) {
      return;
    }

    setOtpLoading(true);

    try {
      await sendRegistrationOtp(form.email);
      setOtpSentTo(form.email.trim().toLowerCase());
      setOtpVerified(false);
      setOtpCooldown(30);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const payload = isRegister
        ? form
        : { email: form.email, password: form.password };

      const { data } = await (isRegister
        ? registerUser(payload)
        : loginUser(payload));

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      navigate(redirectTo, { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] p-6 text-slate-900">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-5xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <AuthBranding />

        <AuthForm
          isRegister={isRegister}
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          otpLoading={otpLoading}
          otpSentTo={otpSentTo}
          otpVerified={otpVerified}
          otpCooldown={otpCooldown}
          sendOtp={sendOtp}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          handleModeChange={handleModeChange}
        />
      </div>

      <LegalLinks />
    </div>
  );
};

export default AuthPage;
