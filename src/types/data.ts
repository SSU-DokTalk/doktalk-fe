export type BasicUserType = {
  id: number;
  name: string;
  profile?: string;
  is_deleted: boolean;
  role: "USER" | "ADMIN";
};

export interface UserType {
  id: number;
  email: string;
  profile?: string;
  name?: string;
  gender?: boolean;
  birthday?: Date;
  introduction?: string;
  follower_num: number;
  following_num: number;
  role: "USER" | "ADMIN";
  created: Date;
  updated: Date;
  is_deleted: boolean;
  deleted_at?: Date;
}

export interface BookAPIType {
  title: string;
  link?: string;
  image?: string;
  author: string;
  discount: number;
  publisher: string;
  pubdate: Date;
  isbn: number;
  description: string;
}

export interface BookType {
  isbn: number;
  title: string;
  image?: string;
  author: string;
  publisher: string;
  pubdate: Date;
  description: string;
}

export interface PostType {
  id: number;
  user_id: number;
  user: BasicUserType;
  title: string;
  content: string;
  files?: string[];
  likes_num: number;
  comments_num: number;
  created: Date;
  updated: Date;
}

export interface SummaryType {
  id: number;
  user_id: number;
  user: BasicUserType;
  isbn: number;
  book: BookType;
  title: string;
  free_content: string;
  charged_content: string;
  price: number;
  files?: string[];
  likes_num: number;
  comments_num: number;
  created: Date;
  updated: Date;
}

export interface DebateType {
  id: number;
  user_id: number;
  user: BasicUserType;
  isbn: number;
  book: BookType;
  location?: string;
  link?: string;
  held_at: Date;
  title: string;
  content: string;
  likes_num: number;
  comments_num: number;
  created: Date;
  updated: Date;
  files?: string[];
}

export interface MyBookType {
  id: number;
  user_id: number;
  user: BasicUserType;
  isbn: number;
  book: BookType;
  created: Date;
  updated: Date;
}

export type FollowType = {
  created: Date;
  follower?: BasicUserType;
  following?: BasicUserType;
  follower_id: number;
  following_id: number;
};

export interface PaymentType {
  id: number;
  user_id: number;
  user: BasicUserType;
  product_type: "D" | "S";
  product_id: number;
  content?: string;
  price: number;
  quantity: number;
  created: Date;
  updated: Date;
  is_deleted: boolean;
  deleted_at?: Date;
}
