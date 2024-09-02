import { defaultPage, LIMIT } from "./common";

export const ROUTER = {
  USER: "/users/profile",
  LOGIN: "/auth/login",
  REGISTER: "/users/admin/registration",
  BLOG: (page: number) => `/posts?limit=${LIMIT}&page=${page ?? defaultPage}`,
  BLOG_DETAIL: (slug: string) => `/posts/${slug}`,
  COMMENT: (id: number) => `/posts/comments/${id}`,
};
