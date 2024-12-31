export interface User {
  id: number;
  email: string;
  profile: string | null;
  name: string | null;
  gender: boolean | null;
  birthday: Date | null;
  introduction: string | null;
  follower_num: number;
  following_num: number;
  role: "USER" | "ADMIN";
  created_at: Date;
  updated_at: Date;
  is_deleted: boolean;
}

export const InitialUser: User = {
  id: 0,
  email: "",
  profile: null,
  name: null,
  gender: null,
  birthday: null,
  introduction: null,
  follower_num: 0,
  following_num: 0,
  role: "USER",
  created_at: new Date(),
  updated_at: new Date(),
  is_deleted: true,
};

export interface Post {
  id: number;
  user_id: number;
  user: User;
  title: string;
  content: string;
  image1: string | null;
  image2: string | null;
  likes_num: number;
  comments_num: number;
  created_at: Date;
  updated_at: Date;
}

export const InitialPost: Post = {
  id: 0,
  user_id: 0,
  user: InitialUser,
  title: "",
  content: "",
  image1: null,
  image2: null,
  likes_num: 0,
  comments_num: 0,
  created_at: new Date(),
  updated_at: new Date(),
};
