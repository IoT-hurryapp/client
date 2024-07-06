import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { login, register, sendVerifyEmailToken, verifyEmailToken } from "../api/auth";
import { IRegisterData, ILoginData } from "../types/auth";
import { PROFILE_KEY } from "../keys";
interface ILoginErrorBody {
    response: {
        data: {
            success: false,
            message: string
        }
    }
};
interface IRegisterErrorBody {
    response: {
        data: {
            success: false,
            message: string,
        }
    }
}
export const useLoginMutation = () => {
    const queryClient = useQueryClient();
    return useMutation<{ success: boolean, username: string; }, ILoginErrorBody, ILoginData>({
        mutationFn: (data) => login(data),
        onSuccess: ({ username }) => {
            queryClient.invalidateQueries({ queryKey: [PROFILE_KEY, { username: "profile" }] });
            queryClient.invalidateQueries({ queryKey: [PROFILE_KEY, { username: username }] });
        },
    })
};
export const useRegisterMutation = () => {
    const queryClient = useQueryClient();
    return useMutation<{ success: boolean, message: string }, IRegisterErrorBody, IRegisterData>({
        mutationFn: (data) => register(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [PROFILE_KEY] });
        },
    })
};