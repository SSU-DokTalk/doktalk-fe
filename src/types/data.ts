import mockBook1 from "@/assets/images/mock.png";
import mockBook2 from "@/assets/images/mock2.png";
import { BookType } from "./components";

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
