import { BasicSummaryRes, CreateSummaryCommentReq, CreateSummaryReq } from "@/types/data";
import axios, { AxiosResponse } from "axios";

/**
 * ======================
 * API Functions
 * ======================
 */

/**
 * GET /summary/{summary_id}
 * 단일 요약 조회
 */
export const getSummary = async (
  summaryId: number
): Promise<BasicSummaryRes> => {
  try {
    const response: AxiosResponse<BasicSummaryRes> = await axios.get(
      `/api/summary/${summaryId}`
    );
    return response.data;
  } catch (error) {
    // handle or rethrow
    throw error;
  }
};

/**
 * POST /summary
 * 요약 생성
 */
export const createSummary = async (
  data: CreateSummaryReq
): Promise<number> => {
  // According to the spec, the successful response body is "0" in the example,
  // which suggests it might just return the created summary’s ID or some other info.
  // Adjust return type if your backend actually returns the newly created resource
  // or a different shape of data.
  try {
    const response: AxiosResponse<number> = await axios.post(
      "/api/summary",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // e.g., new summary ID or something else
  } catch (error) {
    throw error;
  }
};

/**
 * POST /summary/{summary_id}/comment
 * 요약의 댓글 작성
 */
export const createSummaryComment = async (
  summaryId: number,
  data: CreateSummaryCommentReq
): Promise<number> => {
  // The example response for successful creation is "0".
  // Adjust this if your backend returns something else.
  try {
    const response: AxiosResponse<number> = await axios.post(
      `/api/summary/${summaryId}/comment`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * POST /summary/{summary_id}/like
 * 요약에 좋아요 달기
 */
export const likeSummary = async (summaryId: number): Promise<string> => {
  // Example response is a "string" according to the spec.
  try {
    const response: AxiosResponse<string> = await axios.post(
      `/api/summary/${summaryId}/like`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * POST /summary/comment/{summary_comment_id}/like
 * 요약의 댓글에 좋아요 달기
 */
export const likeSummaryComment = async (
  summaryCommentId: number
): Promise<string> => {
  // Example response is a "string".
  try {
    const response: AxiosResponse<string> = await axios.post(
      `/api/summary/comment/${summaryCommentId}/like`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
