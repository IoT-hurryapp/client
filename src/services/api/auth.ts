import axios from "../axiosInstance";
import { ILoginData, IRegisterData } from "../types/auth";
export const login = async ({ email, password }: ILoginData) => {
    return (await axios.post("/auth/login", {
        email,
        password,
    }, { withCredentials: true })).data;
};
export const register = async ({ username, email, password }: IRegisterData) => {
    return (await axios.post("/auth/register", {
        username,
        password,
        email,
    }, { withCredentials: true })).data;
};