"use client";
import Image from "next/image";
import React from "react";
import logo from "../assets/logo/logo.png";
import { useGetUser } from "@/apis/profile";
import { Avatar, Button, Popover, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { removeCookie } from "@/ultils/cookies";
import { ACCESS_TOKEN } from "@/constant/auth-name";
import { useRouter } from "next/navigation";
export default function HeaderComponent() {
  const router = useRouter();
  const { dataUser } = useGetUser();
  const [popover, setShowPopover] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleLogout = () => {
    removeCookie(ACCESS_TOKEN);
    router.push("/login");
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowPopover(event.currentTarget);
  };

  const handleClose = () => {
    setShowPopover(null);
  };

  const open = Boolean(popover);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      {!!dataUser && (
        <div className="flex justify-between p-6 items-center bg-[#14274A] text-white">
          <div className="relative w-[60px] h-[60px]">
            <Image src={logo} alt="logo" fill />
          </div>
          <div>
            <button onClick={handleClick}>
              <Avatar
                sx={{
                  bgcolor: deepPurple[500],
                  width: 50,
                  height: 50,
                  cursor: "pointer",
                }}
              >
                {dataUser?.data?.data?.full_name?.charAt(0)?.toUpperCase()}
              </Avatar>
            </button>

            <Popover
              id={id}
              open={open}
              anchorEl={popover}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Typography
                sx={{ px: 2, py: 1 }}
              >{`Hi ${dataUser?.data?.data?.email}`}</Typography>
              <Button sx={{ px: 2, py: 1 }} onClick={handleLogout}>
                Logout
              </Button>
            </Popover>
          </div>
        </div>
      )}
    </>
  );
}
