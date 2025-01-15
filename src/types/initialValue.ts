import { LoginUserInfoType } from "@/types";
import {
  UserType,
  PostType,
  BasicUserType,
  DebateType,
  BookType,
} from "@/types/data";

export const initialLoginUserInfo: LoginUserInfoType = {
  email: "",
  password: "",
};

export const InitialUser: UserType = {
  id: 0,
  email: "",
  profile: undefined,
  name: undefined,
  gender: undefined,
  birthday: undefined,
  introduction: undefined,
  follower_num: 0,
  following_num: 0,
  role: "USER",
  created: new Date(),
  updated: new Date(),
  is_deleted: true,
};

export const InitialPost: PostType = {
  id: 0,
  user_id: 0,
  user: InitialUser as BasicUserType,
  title: "",
  content: "",
  files: undefined,
  likes_num: 0,
  comments_num: 0,
  created: new Date(),
  updated: new Date(),
};

export const InitialBook: BookType = {
  isbn: 0,
  title: "",
  image: "",
  author: "",
  publisher: "",
  pubdate: "",
  description: "",
  in_library_num: 0,
};

export const InitialDebate: DebateType = {
  id: 0,
  user_id: 0,
  user: InitialUser as BasicUserType,
  isbn: 0,
  book: InitialBook,
  location: undefined,
  link: undefined,
  held_at: new Date(),
  title: "",
  content: "",
  likes_num: 0,
  comments_num: 0,
  created: new Date(),
  updated: new Date(),
  files: undefined,
};

export type UserTabsCandidate = "/post" | "/library";
export type MyTabsCandidate =
  | UserTabsCandidate
  | "/summary"
  | "/debate"
  | "/payment";

export const MyTabs: {
  text: string;
  url: MyTabsCandidate;
}[] = [
  {
    text: "component.section.profile.tab.my-tab.post",
    url: "/post",
  },
  {
    text: "component.section.profile.tab.my-tab.summary",
    url: "/summary",
  },
  {
    text: "component.section.profile.tab.my-tab.library",
    url: "/library",
  },
  {
    text: "component.section.profile.tab.my-tab.debate",
    url: "/debate",
  },
  {
    text: "component.section.profile.tab.my-tab.payment",
    url: "/payment",
  },
];
export const UserTabs: {
  text: string;
  url: UserTabsCandidate;
}[] = [
  {
    text: "component.section.profile.tab.user-tab.post",
    url: "/post",
  },
  {
    text: "component.section.profile.tab.user-tab.library",
    url: "/library",
  },
];
