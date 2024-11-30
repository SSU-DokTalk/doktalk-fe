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

export type ArticleType = {
  title: string;
  content: string;
  createdAt: string;
  like: number;
  commentCount: number;
  comment?: CommentType[];
  image?: string;
  user: UserType;
};

export type CommentType = {
  content: string;
  createdAt: string;
  user: UserType;
};

export type UserType = {
  name: string;
  email: string;
  image?: string;
};

export type SidebarType = {
  user: UserType;
  books: BookType[];
  follwers: number;
  following: number;
};
