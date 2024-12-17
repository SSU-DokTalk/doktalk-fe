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
