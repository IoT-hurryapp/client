import axios from "../axiosInstance";
import { ILoginData, IRegisterData } from "../types/auth";
export const login = async ({ email, password }: ILoginData) => {
    return (await axios.post("/auth/login", {
        email,
        password,
    }, { withCredentials: true })).data;
};
//user enters an email 
export const sendVerifyEmailToken = async (email: string) => {
    return (await axios.post(`/auth/verify-email-token`, { email })).data;
};
export const verifyEmail = async (token: string) => {
    return (await axios.get(`/auth/verify-email?token=${token}`)).data;
};
export const register = async ({ username, email, password }: IRegisterData) => {
    return (await axios.post("/auth/register", {
        username,
        password,
        email,
    }, { withCredentials: true })).data;
};