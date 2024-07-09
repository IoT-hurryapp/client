
export interface IDevice {
    id: string;
    connectedDevicesId: string;
    locationId: string
}
export interface ILocation {
    id: string;
    name: string;
    userId: string;
    devices: IDevice[],
}