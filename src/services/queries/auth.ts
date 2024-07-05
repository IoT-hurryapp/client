import { useQueryClient, useMutation } from "@tanstack/react-query"
import { login, register, sendVerifyEmailToken } from "../api/auth";
import { IRegisterData, ILoginData } from "../types/auth";
import { PROFILE_KEY } from "../keys";
interface ILoginErrorBody {
    response: {
        data: {
            success: boolean,
            isLoggedIn: boolean,
            message: string
        }
    }
};
interface IRegisterErrorBody {
    response: {
        data: {
            success: false,
            isLoggedIn: boolean,
            message: string,
            usedEmail: boolean,
            usedUsername: boolean
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
    return useMutation<{ success: boolean, username: string; }, IRegisterErrorBody, IRegisterData>({
        mutationFn: (data) => register(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [PROFILE_KEY, { username: "profile" }] });
            queryClient.invalidateQueries({ queryKey: [PROFILE_KEY, { username: data.username }] });
        },
    })
};
export const useSendVerifyEmailTokenMutation = () => {
    return useMutation<{ success: boolean, username: string; }, ILoginErrorBody, { email: string }>({
        mutationFn: (data) => sendVerifyEmailToken(data.email),
    });
};