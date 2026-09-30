import {
  login,
  register,
  requestRegistrationOtp,
  verifyRegistrationOtp,
} from "../../../services/mutation";

export const registerUser = (payload) => {
  return register(payload);
};

export const loginUser = (payload) => {
  return login(payload);
};

export const sendRegistrationOtp = (email) => {
  return requestRegistrationOtp(email);
};

export const verifyRegistrationEmailOtp = (payload) => {
  return verifyRegistrationOtp(payload);
};
