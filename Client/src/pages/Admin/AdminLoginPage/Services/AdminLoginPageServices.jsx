// Client / src / pages / Admin / AdminLoginPage / Services / AdminLoginPageServices.jsx
import { adminLogin } from "../../../../services/mutation";

export const loginAdmin = (form) => {
  return adminLogin(form);
};
