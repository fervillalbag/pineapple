import { axios } from "../config";
import { LoginProps, RegisterUserProps } from "../interface";

export const register = async (data: RegisterUserProps) => {
  try {
    const response = await axios({
      method: "POST",
      url: "/auth/register",
      data: JSON.stringify(data),
    });
    return response;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const login = async (data: LoginProps) => {
  const response = await axios({
    method: "POST",
    url: "/auth/login",
    data: JSON.stringify(data),
  });
  return response.data;
};

export const getUser = async (param: string, value: string) => {
  const response = await axios({
    method: "GET",
    url: `/auth/user?${param}=${value}`,
  });
  return response.data;
};
