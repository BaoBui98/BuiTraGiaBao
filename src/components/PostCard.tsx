"use client";
import { ITypeBlogs } from "@/types";
import { Tooltip } from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useRouter } from "next/navigation";
export default function PostCard({ data }: { data: ITypeBlogs }) {
  const router = useRouter();
  return (
    <div className="flex rounded-lg flex-col gap-4 h-[500px] shadow-2xl p-4 xl:col-span-3 md:col-span-4 sm:col-span-6 col-span-12">
      <div className="relative w-full h-[300px] object-cover">
        <Image
          src={data.images[0]}
          alt={data.author_name}
          fill
          className="rounded-xl"
        />
      </div>
      <h4
        onClick={() => {
          router.push(`/${data.slug}`);
        }}
        className="text-lg cursor-pointer hover:text-blue-600"
      >
        {data.title}
      </h4>
      <Tooltip title={data.content}>
        <div
          className="line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: data.content,
          }}
        />
      </Tooltip>

      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <VisibilityIcon />
          <span>{data.views}</span>
        </div>
        <div className="flex gap-2 items-center">
          <AccessTimeIcon />
          <span>{dayjs(data.created_at).format("DD/MM/YYYY")}</span>
        </div>
      </div>
    </div>
  );
}
