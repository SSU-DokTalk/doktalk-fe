import axios from 'axios';
import type { AttachedFile } from './models';

/** 파일 서버(S3)에 올리고 {name, url}을 받아요. directory는 debate·summary·post처럼 도메인 이름이에요. */
export async function uploadFiles(
  files: File[],
  directory: string
): Promise<AttachedFile[]> {
  return Promise.all(
    files.map(async (file) => {
      const body = new FormData();
      body.append('file', file);
      const { data } = await axios.post<AttachedFile>('/api/file', body, {
        params: { directory },
      });
      return data;
    })
  );
}
