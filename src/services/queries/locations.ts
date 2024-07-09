import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLocation, getLocations, getLocation, getDevices, attachDevice, getDeviceData } from "../api/locations";
import { DEVICES_KEY, LOCATION_KEY, DEVICES_DATA_KEY, LOCATIONS_KEY } from "../keys";
import { ILocation } from "../../interfaces/global";
interface IGetLocationData {
    id: string;
    name: string;
    userId: string,
    devices: [
        {
            id: string;
            connectedDevicesId: number
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
    return useQuery<ILocation[]>
        ({
            queryKey: [LOCATIONS_KEY],
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
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [LOCATIONS_KEY, { locationId: data.id }] });
        },
    })
};
export const getDevicesQuery = () => {
    return useQuery({
        queryKey: [DEVICES_KEY],
        queryFn: async () => await getDevices()
    })
}
export const getDeviceDataQuery = ({ locationId, deviceId, page }: { locationId: string, deviceId: string, page: number }) => {
    return useQuery({
        queryKey: [DEVICES_DATA_KEY, { page }],
        queryFn: async () => await getDeviceData({ locationId, deviceId, page }),
        placeholderData: keepPreviousData
    })
};
export const useAttachDeviceMutation = () => {
    const queryClient = useQueryClient();
    return useMutation<{ success: true }, { success: false, message: string }, { deviceId: string, locationId: string }>({
        mutationFn: async ({ deviceId, locationId }) => await attachDevice(locationId, deviceId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [LOCATIONS_KEY] });
        },
        onError: () => {
            queryClient.invalidateQueries({ queryKey: [LOCATIONS_KEY] });
        }
    });
}