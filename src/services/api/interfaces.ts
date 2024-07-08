export interface IData {
	id: string;
	AQI: number;
	AQIStatus: string;
	dustPercentage: number;
	humidity: number;
	temperatureC: number;
	temperatureF: number;
	createdAt: Date;
	connectedDevicesId: string;
	deviceId: string | null;
}
export interface ILocation {
	id: string;
	name: string;
	userId: string;
}
