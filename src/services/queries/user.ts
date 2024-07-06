import { useQuery } from "@tanstack/react-query"
import { PROFILE_KEY } from "../keys"
import { getUser } from "../api/user"

export const getUserQuery = () => {
    return useQuery({
        queryKey: [PROFILE_KEY],
        queryFn: async () => await getUser(),
    })
};