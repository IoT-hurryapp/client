import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLocation, getLocations, getLocation, getDevices, attachDevice, getDeviceData } from "../api/locations";
import { DEVICES_KEY, LOCATION_KEY, DEVICES_DATA_KEY } from "../keys";
interface IGetLocationData {
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
}
interface IGetLocationError {
    response: {
        data: {
            success: false,
            message: string,
        }
    }
};
interface ICreateLocationError {
    response: {
        data: {
            success: false,
            message: string,
        }
    }
};
interface ICreateLocationSuccess {
    id: string;
    name: string;
    userId: string;
};
//mutation types -> success,error,body
export const getLocationsQuery = () => {
    return useQuery<Array<{
        id: string;
        name: string;
        userId: string,
        devices: []
    }>
    >({
        queryKey: [LOCATION_KEY],
        queryFn: async () => await getLocations(),
    })
}
export const getLocationQuery = (locationId: string) => {
    return useQuery<{}, IGetLocationError, IGetLocationData>({
        queryFn: async () => await getLocation(locationId),
        queryKey: [LOCATION_KEY, { locationId }],
    });
};
export const useCreateLocationMutation = () => {
    const queryClient = useQueryClient();
    return useMutation<ICreateLocationSuccess, ICreateLocationError, {
        name: string,
    }>({
        mutationFn: ({ name }) => createLocation(name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [LOCATION_KEY] });
        },
    })
};
export const getDevicesQuery = () => {
    return useQuery({
        queryKey: [DEVICES_KEY],
        queryFn: async () => await getDevices()
    })
}
export const getDeviceDataQuery = (locationId: string, deviceId: string) => {
    return useQuery({
        queryKey: [DEVICES_DATA_KEY],
        queryFn: async () => await getDeviceData(locationId, deviceId)
    })
}
export const useAttachDeviceMutation = () => {
    const queryClient = useQueryClient();
    return useMutation<{ success: true }, { success: false, message: string }, { deviceId: string, locationId: string }>({
        mutationFn: async ({ deviceId, locationId }) => await attachDevice(locationId, deviceId),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: [LOCATION_KEY, { locationId: variables.locationId }] })
        }
    });
}