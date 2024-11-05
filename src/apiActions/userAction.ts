import { apiRoutes } from "@/utils/apiRoutes";
import axiosInstance from "./axiosConfig";
export const GetUserDetails: any = async (data: any) => {
  let res = await axiosInstance.get(apiRoutes.private.getUserDetails, data);
  return res.data;
};
export const Registration: any = async (data: any) => {
  let res = await axiosInstance.post(apiRoutes.users.registration, data);
  return res.data;
};

export const UpdateUserDetails: any = async (data: any) => {
  let res = await axiosInstance.put(apiRoutes.users.registration, data);
  return res.data;
};

export const LoginUser: any = async (data: any) => {
  let res = await axiosInstance.post(apiRoutes.users.login, data);
  return res.data;
};

export const VerifyEmail: any = async (data: any) => {
  let res = await axiosInstance.post(apiRoutes.users.verifyEmail, data);
  return res.data;
};

export const ForgotPasswordEmail: any = async (data: any) => {
  let res = await axiosInstance.post(apiRoutes.users.forgotPasswordEmail, data);
  return res.data;
};

export const VrifyForgotPassToken: any = async (data: any) => {
  let res = await axiosInstance.post(
    apiRoutes.users.verifyForgotPassToken,
    data
  );
  return res.data;
};
export const ResetForgotPassword: any = async (data: any) => {
  let res = await axiosInstance.put(apiRoutes.users.resetForgotPassword, data);
  return res.data;
};
export const ChangePassword: any = async (data: any) => {
  let res = await axiosInstance.put(
    apiRoutes.private.userProfileChangePassword,
    data
  );
  return res.data;
};
export const ChangeEmail: any = async (data: any) => {
  let res = await axiosInstance.put(
    apiRoutes.private.userProfileChangeEmail,
    data
  );
  return res.data;
};

export const DeleteAccount: any = async (data: any) => {
  let res = await axiosInstance.put(
    apiRoutes.private.userProfileDeleteAccount,
    data
  );
  return res.data;
};
