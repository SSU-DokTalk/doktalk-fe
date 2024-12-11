export type LinkItemType = {
  title: string;
  url: string;
};

export type BookType = {
  title: string;
  imgSrc: string;
  author: string;
  href: string;
};

export type CommentType = {
  content: string;
  createdAt: string;
  user: UserType;
};

export interface UserType {
  id: number;
  profile: string;
  name: string;
  role: string; // 필요하다면 "USER" | "ADMIN" 등으로 세분화 가능
  is_deleted: boolean;
}

export interface ArticleType {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image1: string;
  image2: string;
  likes_num: number;
  comments_num: number;
  created_at: string; // "2024-12-09T10:38:26.033Z" 처럼 ISO8601 포맷 시간 문자열
  updated_at: string;
  user: UserType;
}

export type SidebarType = {
  user: UserType;
  books: BookType[];
  follwers: number;
  following: number;
};
