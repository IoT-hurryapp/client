import axios from "../axiosInstance";

export const getUser = async () => {
    return (await axios.get("/user", { withCredentials: true })).data;
};