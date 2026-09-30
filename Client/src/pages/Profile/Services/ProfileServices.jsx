import { getGoogleConnectUrl, getMe } from "../../../services/fetch";
import { updateProfile } from "../../../services/mutation";

export const loadProfileUser = async () => {
  const data = await getMe();
  return data?.user;
};

export const saveProfile = async (form) => {
  const data = await updateProfile(form);
  return data?.user;
};

export const getGoogleCalendarConnectUrl = async () => {
  const data = await getGoogleConnectUrl();
  return data?.url;
};
