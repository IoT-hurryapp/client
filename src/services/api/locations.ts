import axios from "../axiosInstance";
export const getLocation = async (id: string) => {
    return (await axios.get<{
        id: string;
        name: string;
        userId: string,
        devices: [
            {
                id: string;
                connectedDevicesIdn: number
                locationId: string;
            }
        ]
    }>(`${import.meta.env.VITE_API_URL}/locations/${id}`)).data;
};
export const getLocations = async () => {
    return (
        await axios.
            get(`/locations`)
    ).data;
};
export const createLocation = async (name: string) => {
    return (await axios.post<{
        id: string;
        userId: string;
        name: string;
    }>(`/locations`, { name }, { withCredentials: true })).data;
};
export const getDevices = async () => {
    return (await axios.get<Array<{ id: string }>>(`/locations/devices`)).data;
};
export const getDevice = async (locationId: string, connectedDevicesId: string) => {
    return (await axios.get<Array<{ id: string }>>(`/locations/${locationId}/${connectedDevicesId}`)).data;
};
export const attachDevice = async (locationId: string, deviceId: string) => {
    return (await axios.post(`/locations/${locationId}/${deviceId}`)).data
};
export interface IData {
    "temperature_c": number,
    "temperature_f": number,
    "mq135_value": number,
    "mq135_statys": string,
    "dust_concentration": number,
    "createdAt": string,
    "connectedDevicesId": string,
}
export const getDeviceData = async (locationId: string, deviceId: string) => {
    return (await axios.get<Array<IData>>(`/locations/${locationId}/${deviceId}`)).data
}