import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createLocation, getLocations, getLocation } from "../api/location";
import { LOCATION_KEY } from "../keys";
interface IGetLocationData {
    id: string,
}
interface IGetLocationError {
    response: {
        data: {
            success: false,
            message: string,
        }
    }
};
interface ICreateLocationData {
    name: string,
}
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
export const getLocationsQuery = () => {
    return useQuery({
        queryKey: [LOCATION_KEY],
        queryFn: async () => await getLocations(),
    })
}
export const getLocationQuery = (locationId: string) => {
    return useQuery<{}, IGetLocationError, IGetLocationData>({
        queryFn: async () => await getLocation(locationId),
        queryKey: [LOCATION_KEY, { locationId }],
    })
};
export const useCreateLocationMutation = () => {
    const queryClient = useQueryClient();
    return useMutation<ICreateLocationSuccess, ICreateLocationError, ICreateLocationData>({
        mutationFn: ({ name }) => createLocation(name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [LOCATION_KEY] });
        },
    })
};
