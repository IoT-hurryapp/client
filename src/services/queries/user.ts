import { useQuery } from "@tanstack/react-query"
import { PROFILE_KEY } from "../keys"
import { getUser } from "../api/user"
import { IUser } from "../../interfaces/global";

export const getUserQuery = () => {
    return useQuery<IUser>({
        queryKey: [PROFILE_KEY],
        queryFn: async () => await getUser(),
    })
};