import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { getRequest } from "./services";
import { ROUTER } from "@/constant/routes";
import { IProfileTypes, IResponseProfileSuccess, ITypeBlogs } from "@/types";
import { QUERY_KEY } from "@/constant/query-key";

export function useGetUser() {
  const { isLoading, data: dataUser } = useQuery<
    AxiosResponse<IResponseProfileSuccess<IProfileTypes>>
  >({
    queryKey: [...QUERY_KEY.USER],
    queryFn: async () =>
      getRequest({
        url: ROUTER.USER,
      }),
  });
  return { isLoading, dataUser };
}
