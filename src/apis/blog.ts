import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequest, patchRequest, postRequest } from "./services";
import { AxiosResponse } from "axios";
import {

  IAddCommentBlogs,
  IResponseSuccess,
  ITypeBlogs,
 
} from "@/types";
import { QUERY_KEY } from "@/constant/query-key";
import { ROUTER } from "@/constant/routes";
import { toast } from "react-toastify";
import { defaultPage } from "@/constant/common";

export function useGetBlogs(page: number) {
  const { isLoading, data: dataBlogs } = useQuery<
    AxiosResponse<IResponseSuccess<ITypeBlogs>>
  >({
    queryKey: [...QUERY_KEY.BLOG, page],
    queryFn: async () =>
      getRequest({
        url: ROUTER.BLOG(page ?? defaultPage),
      }),
  });
  return { isLoading, dataBlogs };
}

export function useGetOneBlog(slug: string) {
  const { isLoading, data: dataBlogDetail } = useQuery({
    queryKey: [...QUERY_KEY.BLOG, slug],
    queryFn: async () =>
      await getRequest({
        url: `${ROUTER.BLOG_DETAIL(slug)}`,
      }),
  });
  return { isLoading, dataBlogDetail };
}

export function useCommentBlog(id: number) {
  const queryClient = useQueryClient();

  const { mutate: commentBlog, isPending: isCommentingBlog } = useMutation({
    mutationFn: async ({ data }: { data: IAddCommentBlogs }) =>
      await postRequest({
        url: ROUTER.COMMENT(id),
        payload: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEY.BLOG],
      });
      toast.success("Bình luận thành công");
    },
    onError: () => {
      toast.error("Bình luận thất bại");
    },
  });

  return { commentBlog, isCommentingBlog };
}

export function useEditComment(id: number) {
  const queryClient = useQueryClient();

  const { mutate: editComment, isPending: isEditComment } = useMutation({
    mutationFn: async ({ data }: { data: Partial<IAddCommentBlogs> }) =>
      await patchRequest({
        url: ROUTER.COMMENT(id),
        payload: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [...QUERY_KEY.BLOG],
      });
      toast.success("Edit bình luận thành công");
    },
    onError: () => {
      toast.error("Edit bình luận thất bại");
    },
  });

  return { editComment, isEditComment };
}
