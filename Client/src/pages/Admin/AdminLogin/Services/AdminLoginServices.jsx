import { adminLogin } from "../../../../services/mutation";

export const loginAdmin = (form) => {
  return adminLogin(form);
};
