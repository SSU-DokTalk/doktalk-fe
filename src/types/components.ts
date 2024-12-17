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

export type UserType = {
  id: number;
  email: string;
  profile: string;
  name: string;
  gender: boolean;
  birthday: string;
  introduction: string;
  follower_num: number;
  following_num: number;
  role: string; // 필요하다면 "USER" | "ADMIN" 등으로 세분화 가능
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
};

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

export type RegisterType = {
  email: string;
  nickname: string;
  password: string;
  gender: string;
  birthdate: string;
  validation: boolean;
  interest: string[];
  agreement: {
    agreement1: boolean;
    agreement2: boolean;
    agreement3: boolean;
  };
};
