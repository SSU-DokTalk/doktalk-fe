import axios from 'axios';
import type { AttachedFile } from './models';

/**
 * 첨부파일 내려받기. 파일 서버 주소를 백엔드(/file)를 거쳐 받아서
 * 로그인 헤더가 붙고, 원래 파일 이름으로 저장돼요.
 */
export async function downloadAttachment(file: AttachedFile) {
  const { data } = await axios.get<Blob>('/api/file', {
    params: { url: file.url },
    responseType: 'blob',
  });
  const href = URL.createObjectURL(data);
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.download = file.name || 'download';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(href);
}
