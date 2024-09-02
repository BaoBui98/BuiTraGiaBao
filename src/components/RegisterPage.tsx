"use client";
import React from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ic_phone from "../assets/icons/ic-phone.svg";
import ic_password from "../assets/icons/ic_password.svg";
import {
  LoginFormUserData,
  loginSchema,
  RegisterFormUserData,
  registerSchema,
} from "@/common/validate";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useLogin, useRegister } from "@/apis/auth";
import { useRouter } from "next/navigation";
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const { register, isRegister } = useRegister();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (data: RegisterFormUserData) => {
    register(
      {
        data: {
          full_name: data.full_name,
          email: data.email,
          ic_code: data.ic_code,
          password: data.password,
        },
      },
      {
        onSuccess: () => {
          router.push("/login");
        },
      }
    );
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "white",
        p: 4,
      }}
    >
      <Controller
        name="full_name"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin="normal" error={!!errors.full_name}>
            <InputLabel htmlFor="full_name" sx={{ color: "#374151" }}>
              FullName
            </InputLabel>
            <OutlinedInput
              label="FullName"
              {...field}
              id="full_name"
              startAdornment={
                <InputAdornment position="start">
                  <Image src={ic_phone} alt="ic_phone" width={20} height={20} />
                </InputAdornment>
              }
              placeholder="FullName"
              error={!!errors.full_name}
            />
            {errors.full_name && (
              <Typography color="error" variant="caption">
                {errors.full_name.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormControl fullWidth margin="normal" error={!!errors.email}>
            <InputLabel htmlFor="email" sx={{ color: "#374151" }}>
              Email
            </InputLabel>
            <OutlinedInput
              label="Email"
              {...field}
              id="email"
              startAdornment={
                <InputAdornment position="start">
                  <Image src={ic_phone} alt="ic_phone" width={20} height={20} />
                </InputAdornment>
              }
              placeholder="Email"
              error={!!errors.email}
            />
            {errors.email && (
              <Typography color="error" variant="caption">
                {errors.email.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="ic_code"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormControl fullWidth margin="normal" error={!!errors.ic_code}>
            <InputLabel htmlFor="ic_code" sx={{ color: "#374151" }}>
              Code
            </InputLabel>
            <OutlinedInput
              label="Code"
              {...field}
              id="ic_code"
              startAdornment={
                <InputAdornment position="start">
                  <Image src={ic_phone} alt="ic_phone" width={20} height={20} />
                </InputAdornment>
              }
              placeholder="Mã số code"
              error={!!errors.ic_code}
            />
            {errors.ic_code && (
              <Typography color="error" variant="caption">
                {errors.ic_code.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin="normal" error={!!errors.password}>
            <InputLabel htmlFor="password" sx={{ color: "#374151" }}>
              Mật khẩu
            </InputLabel>
            <OutlinedInput
              label="Mật khẩu"
              {...field}
              id="password"
              type={showPassword ? "text" : "password"}
              startAdornment={
                <InputAdornment position="start">
                  <Image
                    src={ic_password}
                    alt="ic_password"
                    width={20}
                    height={20}
                  />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Nhập mật khẩu"
              error={!!errors.password}
            />
            {errors.password && (
              <Typography color="error" variant="caption">
                {errors.password.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.confirmPassword}
          >
            <InputLabel htmlFor="confirmPassword" sx={{ color: "#374151" }}>
              Xác nhận Mật khẩu
            </InputLabel>
            <OutlinedInput
              label=" Xác nhận Mật khẩu"
              {...field}
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              startAdornment={
                <InputAdornment position="start">
                  <Image
                    src={ic_password}
                    alt="ic_password"
                    width={20}
                    height={20}
                  />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Nhập lai mật khẩu"
              error={!!errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <Typography color="error" variant="caption">
                {errors.confirmPassword.message}
              </Typography>
            )}
          </FormControl>
        )}
      />
      <Button
        disabled={isRegister}
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          bgcolor: "#2563EB",
          mt: 4,
          mb: 4,
          "&:hover": { bgcolor: "#1d4ed8" },
        }}
      >
        Đăng ký
      </Button>
    </Box>
  );
}
