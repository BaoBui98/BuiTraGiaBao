import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postRequest } from "./services";
import { ROUTER } from "@/constant/routes";
import { toast } from "react-toastify";
import { IRegisterType, IResponseError, LoginProps } from "@/types";
import { setCookie } from "@/ultils/cookies";
import { ACCESS_TOKEN } from "@/constant/auth-name";
import { AxiosError } from "axios";

export function useLogin() {
  const { mutate: login, isPending: isLogin } = useMutation({
    mutationFn: async ({ data }: { data: LoginProps }) =>
      await postRequest({
        url: ROUTER.LOGIN,
        payload: data,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }),
    onSuccess: (data) => {
      setCookie(ACCESS_TOKEN, data.data.access_token);
      toast.success("Đăng nhập thành công");
    },
    onError: (err) => {
      toast.error("Đăng nhập thất bại");
    },
  });

  return { login, isLogin };
}

export function useRegister() {
  const { mutate: register, isPending: isRegister } = useMutation({
    mutationFn: async ({ data }: { data: IRegisterType }) =>
      await postRequest({
        url: ROUTER.REGISTER,
        payload: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      toast.success("Đăng ký thành công");
    },
    onError: (err: AxiosError<IResponseError>) => {
      console.log("err", err);
      if (err.status === 409) {
        toast.error("Tài khoản đã tồn tại");
        return;
      }
      console.error(err);
      toast.error("Lỗi hệ thống vui lòng liên lạc với quản trị viên");
    },
  });

  return { register, isRegister };
}
