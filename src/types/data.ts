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

export const MOCK_DEBATES = [
  {
    title: "책1",
    imgSrc: mockBook1,
    content: "이 책은 정말 재밌어요",
    author: "작가1",
  },

  {
    title: "책1",
    imgSrc: mockBook1,
    content: "이 책은 정말 재밌어요",
    author: "작가1",
  },
  {
    title: "책1",
    imgSrc: mockBook1,
    content: "이 책은 정말 재밌어요",
    author: "작가1",
  },
];

interface SummaryUser {
  id: number;
  profile: string; // e.g. "https://example.com/profile-image.jpg"
  name: string;
  role: string; // e.g. "USER" | "ADMIN"
  is_deleted: boolean;
}

export interface BasicSummaryRes {
  id: number;
  user_id: number;
  isbn: string;
  title: string;
  free_content: string[];
  charged_content: string[];
  price: number;
  image1: string;
  image2: string;
  likes_num: number;
  comments_num: number;
  created_at: string; // or Date
  updated_at: string; // or Date
  user: SummaryUser; // Info about the user who created the summary
}

/**
 * Data structure for creating a new summary.
 * Adjust to match your backend’s requirements.
 */
export interface CreateSummaryReq {
  isbn: string;
  title: string;
  free_content: string[];
  charged_content: string[];
  price: number;
  image1?: string;
  image2?: string;
}

/**
 * Data structure for creating a new comment on a summary
 */
export interface CreateSummaryCommentReq {
  content: string;
}
