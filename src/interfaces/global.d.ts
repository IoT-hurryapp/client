export interface IDevice {
    id: string;
    connectedDevicesId: string;
    locationId: string
}
export interface ILocation {
    id: string;
    name: string;
    userId: string;
    devices: {
        id: string;
        connectedDeviceId: string;
        locationId: string;
    }[];
    notifications: {
        id: string;
        message: string;
        dataId: string;
        locationId: string;
    }[];
}
export type DataReadingKey = "AQI" | "dustPercentage" | "temperatureC" | "humidity";
export interface IUser {
    id: string;
    locations: Array<ILocation>;
    token: null
    username: string;
}