export type LoginUserInfoType = {
  email: string;
  password: string;
};

export interface SummaryUser {
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
