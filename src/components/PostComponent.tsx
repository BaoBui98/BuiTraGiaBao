"use client";
import { useGetBlogs } from "@/apis/blog";
import React from "react";
import PostCard from "./PostCard";
import { Box, CircularProgress } from "@mui/material";
import { Pagination } from "@mui/material";
export default function PostPage() {
  const [page, setPage] = React.useState(1);
  const { dataBlogs, isLoading } = useGetBlogs(page);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <div className="flex flex-col gap-4 p-6">
      <h4 className="text-center text-2xl text-black font-bold">BLOG</h4>
      {isLoading && !dataBlogs ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {!!dataBlogs && !!dataBlogs.data && dataBlogs.data.data.length > 0 ? (
            <div className="grid grid-cols-12 gap-4">
              {dataBlogs.data.data.map((item) => {
                return <PostCard key={item.id} data={item} />;
              })}
            </div>
          ) : (
            <h2>No data</h2>
          )}
        </>
      )}
      <div className="flex justify-center my-6">
        <Pagination
          page={page}
          onChange={handleChange}
          count={dataBlogs?.data.metadata.total_page}
          color="primary"
        />
      </div>
    </div>
  );
}
