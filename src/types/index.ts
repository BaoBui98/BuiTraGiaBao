export interface LoginProps {
  username: string;
  password: string;
}

export interface IRegisterType {
  full_name: string;
  ic_code: string;
  email: string;
  password: string;
}

export interface IResponseSuccess<T> {
  data: T[];
  message: string;
  status: number;
  metadata: {
    total_page: number;
    total_data: number;
  };
}

export interface IResponseProfileSuccess<T> {
  data: T;
  message: string;
  status: number;
}

export interface IResponseError {
  errors: null | string;
  message: string | null;
  status: number;
}

export interface ITypeBlogs {
  id: number;
  user_id: number;
  images: string[];
  likes: number;
  title: string;
  content: string;
  is_feature: boolean;
  tags: string[];
  views: number;
  slug: string;
  author_name: string;
  created_at: string;
}

export interface ICommentTypes {
  content: string;
  created_at: string;
  id: number;
  name: string;
  parent_comment_id: number | null;
  post_id: number;
  user_id: number;
  child_comments: ICommentTypes[] | [];
}

export interface IAddCommentBlogs {
  content: string;
  parent_comment_id: number | null;
}

export interface IProfileTypes {
  id: number;
  full_name: string;
  email: string;
}
