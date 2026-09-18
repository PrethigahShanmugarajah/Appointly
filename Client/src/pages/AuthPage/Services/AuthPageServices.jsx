// Client / src / pages / AuthPage / Services / AuthPageServices.jsx
import {
  login,
  register,
  requestRegistrationOtp,
  verifyRegistrationOtp,
} from "../../../services/mutation";

// export const registerUser = (payload) => {
//   return register(payload);
// };

// export const loginUser = (payload) => {
//   return login(payload);
// };

export const registerUser = async (payload) => {
  console.log("registerUser payload:", payload);
  const response = await register(payload);
  console.log("registerUser response:", response);
  return response;
};

export const loginUser = async (payload) => {
  console.log("loginUser payload:", payload);
  const response = await login(payload);
  console.log("loginUser response:", response);
  return response;
};

export const sendRegistrationOtp = (email) => {
  return requestRegistrationOtp(email);
};

export const verifyRegistrationEmailOtp = (payload) => {
  return verifyRegistrationOtp(payload);
};
