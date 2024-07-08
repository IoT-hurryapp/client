import axios from "../axiosInstance";
import { IData, ILocation } from "./interfaces";
export const getLocation = async (id: string) => {
	return (
		await axios.get<ILocation>(`${import.meta.env.VITE_API_URL}/locations/${id}`)
	).data;
};
export const getLocations = async () => {
	return (await axios.get<ILocation[]>(`/locations`)).data;
};
export const createLocation = async (name: string) => {
	return (
		await axios.post<ILocation>(`/locations`, { name }, { withCredentials: true })
	).data;
};
export const getDevices = async () => {
	return (await axios.get<Array<{ id: string }>>(`/locations/devices`)).data;
};

export const attachDevice = async (locationId: string, deviceId: string) => {
	return (await axios.post(`/locations/${locationId}/${deviceId}`)).data;
};

export const getDeviceData = async (locationId: string, connectedDevicesId: string) => {
	return (
		await axios.get<IData[]>(`/locations/${locationId}/${connectedDevicesId}`)
	).data;
};
