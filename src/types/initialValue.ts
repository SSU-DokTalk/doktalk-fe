import { LoginUserInfoType } from "@/types";
import { UserType, PostType, BasicUserType } from "@/types/data";
import { BookType } from "./components";
import mockBook1 from "@/assets/images/mock.png";
import mockBook2 from "@/assets/images/mock2.png";

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
    text: "게시글",
    url: "/post",
  },
  {
    text: "내 요약",
    url: "/summary",
  },
  {
    text: "내 서재",
    url: "/library",
  },
  {
    text: "토론방",
    url: "/debate",
  },
  {
    text: "결제내역",
    url: "/payment",
  },
];
export const UserTabs: {
  text: string;
  url: UserTabsCandidate;
}[] = [
  {
    text: "게시글",
    url: "/post",
  },
  {
    text: "서재",
    url: "/library",
  },
];

export const MOCK_BOOKS: BookType[] = [
  {
    title: "책1",
    imgSrc: mockBook1,
    author: "작가1",
    href: "https://www.naver.com",
  },
  {
    title: "책2",
    imgSrc: mockBook2,
    author: "작가2",
    href: "https://www.naver.com",
  },
  {
    title: "책1",
    imgSrc: mockBook1,
    author: "작가1",
    href: "https://www.naver.com",
  },
  {
    title: "책2",
    imgSrc: mockBook2,
    author: "작가2",
    href: "https://www.naver.com",
  },
  {
    title: "책1",
    imgSrc: mockBook1,
    author: "작가1",
    href: "https://www.naver.com",
  },
];
