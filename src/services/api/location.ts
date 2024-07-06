import axios from "../axiosInstance";
export const getLocation = async (id: string) => {
    return (await axios.get<{
        id: string;
        name: string;
        userId: string,
        devices: []
    }>(`http://46.101.128.142:5050/locations/${id}`)).data;
};
export const getLocations = async () => {
    return (
        await axios.
            get<Array<{
                id: string;
                name: string;
                userId: string,
                devices: []
            }>
            >("http://46.101.128.142:5050/locations/")
    ).data;
};
export const createLocation = async (name: string) => {
    return (await axios.post<{
        id: string;
        userId: string;
        name: string;
    }>(`/locations`, { name }, { withCredentials: true })).data;
};
export const getLocationDevices = async (id: string) => {
    return (await axios.get(`/${id}`)).data;
};