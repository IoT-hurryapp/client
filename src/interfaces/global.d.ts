export interface IDevice {
	id: string;
	connectedDevicesId: string;
	locationId: string;
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
export type DataReadingKey =
	| "AQI"
	| "dustPercentage"
	| "temperatureC"
	| "humidity";
export interface IUser {
	locations: ILocation[];
	notifications: INotification[];
	id: string;
	username: string;
	token: string | null;
}

export interface INotification {
	id: string;
	title: string;
	description: string;
	status: string;
	dataId: string;
	locationId: string;
	createdAt: string;
	userId: string;
	connectedDevicesId: string;
	location: {
		id: string;
		name: string;
		userId: string;
	};
}
