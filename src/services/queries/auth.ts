import { useQueryClient, useMutation } from "@tanstack/react-query"
import { login, register, logout } from "../api/auth";
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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PROFILE_KEY], refetchType: "all" });
        },
    })
};
export const useLogoutMutation = () => {
    const queryClient = useQueryClient();
    return useMutation<{ success: boolean, message: string }, { success: false, message: string }, {}>({
        mutationFn: () => logout(),
        onSuccess: () => {
            queryClient.resetQueries()
        },
    })
};
export const useRegisterMutation = () => {
    const queryClient = useQueryClient();
    return useMutation<{ success: boolean, message: string }, IRegisterErrorBody, IRegisterData>({
        mutationFn: (data) => register(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [PROFILE_KEY], refetchType: "all" });
        },
    })
};