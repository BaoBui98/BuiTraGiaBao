"use client";
import { useGetOneBlog } from "@/apis/blog";
import { Box, CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import CommentComponent from "./CommentComponent";

export default function DetailBlogComponent(slug: { slug: string }) {
  const { dataBlogDetail, isLoading } = useGetOneBlog(slug.slug);
  console.log(dataBlogDetail?.data.data, "dataBlogDetail");

  return (
    <div className="p-6 my-6">
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {!!dataBlogDetail && !!dataBlogDetail.data.data ? (
            <div className="flex flex-col gap-4">
              <h4 className="text-center text-2xl text-black font-bold">
                {dataBlogDetail.data.data.title}
              </h4>
              <div className="flex gap-2 items-center  justify-center">
                <span className="font-bold text-lg">
                  {dataBlogDetail.data.data.author_name}
                </span>
                <span>-</span>
                <span>
                  {dayjs(dataBlogDetail.data.data.created_at).format(
                    "DD/MM/YYYY"
                  )}
                </span>
              </div>
              <div className="relative w-full h-[600px]">
                <Image
                  src={dataBlogDetail.data.data.images[0]}
                  alt={dataBlogDetail.data.data.author_name}
                  fill
                  className="rounded-xl object-center"
                />
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: dataBlogDetail.data.data.content,
                }}
              ></div>
              <CommentComponent
                blogId={dataBlogDetail.data.data.id}
                comments={dataBlogDetail?.data.data.comments}
              />
            </div>
          ) : (
            <h2>No data</h2>
          )}
        </>
      )}
    </div>
  );
}
