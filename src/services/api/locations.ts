import axios from "../axiosInstance";
import { ILocation } from "../../interfaces/global";
import { IData } from "./interfaces";
export interface IGetDeviceData {
    page: number;
    pages: number;
    data: Array<IData>;
}
export const getLocation = async (id: string) => {
    return (
        await axios.get<ILocation>(`${import.meta.env.VITE_API_URL}/locations/${id}`, { withCredentials: true })
    ).data;
};
export const getLocations = async () => {
    return (await axios.get<ILocation[]>(`/locations`, { withCredentials: true })).data;
};
export const getPublicLocations = async () => {
    return (await axios.get<Array<{ id: number, name: string }>>(`/public/devices`, { withCredentials: true })).data;
};
export const createLocation = async (name: string) => {
    return (
        await axios.post<ILocation>(`/locations`, { name }, { withCredentials: true })
    ).data;
};
export const getDevices = async () => {
    return (await axios.get<Array<{ id: string }>>(`/locations/devices`, { withCredentials: true })).data;
};
export const attachDevice = async (locationId: string, deviceId: string) => {
    return (await axios.post(`/locations/${locationId}/${deviceId}`, {}, { withCredentials: true })).data;
};
export const getDeviceData = async ({ locationId, deviceId, page }: { locationId: string, deviceId: string, page: number }) => {
    return (
        await axios.get<IGetDeviceData>(`/locations/${locationId}/${deviceId}?page=${page}`, { withCredentials: true })
    ).data;
};
