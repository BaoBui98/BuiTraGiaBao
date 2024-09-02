import DetailBlogComponent from "@/components/DetailBlogComponent";

import React from "react";

export default function DetailBlog({ params }: { params: { slug: string } }) {
  return (
    <>
      <DetailBlogComponent slug={params.slug[0] ?? ""} />
    </>
  );
}
