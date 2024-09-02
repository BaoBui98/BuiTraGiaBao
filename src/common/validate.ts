import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
});

export type LoginFormUserData = yup.InferType<typeof loginSchema>;

export const registerSchema = yup.object().shape({
  full_name: yup.string().required("Vui lòng nhập tên đăng nhập"),

  ic_code: yup.string().required("Vui lòng nhập mã số code"),

  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Email không hợp lệ"),

  password: yup.string().required("Vui lòng nhập mật khẩu"),

  confirmPassword: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .oneOf([yup.ref("password")], "Mật khẩu không trùng khớp"),
});

export type RegisterFormUserData = yup.InferType<typeof registerSchema>;
