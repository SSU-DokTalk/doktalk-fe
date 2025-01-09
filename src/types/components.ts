import { UserType } from "./data";

export type LinkItemType = {
  title: string;
  url: string;
};

export type PreviewType = {
  url: string;
  filename: string;
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

export type SidebarType = {
  user?: UserType;
  books?: BookType[];
  follwers?: number | null;
  following?: number | null;
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
