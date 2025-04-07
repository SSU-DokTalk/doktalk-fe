import { Dispatch, SetStateAction, useState } from 'react';

import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import UploadFiles from '@/components/base/UploadFiles';
import { ACCEPTABLE } from '@/common/variables';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { FileType, PostType } from '@/types/data';
import { useParams } from 'react-router-dom';

function UpdatePostModal({
  post,
  showModal,
  setShowModal,
}: {
  post: PostType;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  isEdit?: boolean;
  setDidPost?: Dispatch<SetStateAction<boolean>>;
}) {
  const { post_id } = useParams();

  const [postData, setPostData] = useState<{
    title: string;
    content: string;
  }>({
    title: post.title,
    content: post.content,
  });

  const [files, setFiles] = useState<File[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<FileType[]>(
    post.files ?? []
  );

  const doUpdate = async () => {
    const fileRes = await Promise.all(
      files.map(
        async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          return await axios
            .post('/api/file', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              params: {
                directory: 'post',
              },
            })
            .then((res) => res.data);
        },
        () => null
      )
    );
    await axios
      .put(`/api/post/${post_id}`, {
        ...postData,
        files: uploadedFiles.concat(fileRes),
      })
      .then(() => window.location.reload());
  };

  return (
    <Dialog
      id='write-post-modal'
      open={showModal}
      onClose={() => {
        setShowModal(false);
      }}
      maxWidth='sm'
      fullWidth
      scroll='body'
    >
      <DialogTitle>
        <b>게시글 수정</b>
      </DialogTitle>
      <IconButton
        className='btn-close'
        aria-label='close'
        onClick={() => setShowModal(false)}
        sx={{ position: 'absolute', right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent>
        <div className='post-container'>
          <div className='post-title-container'>
            <input
              type='text'
              placeholder='제목을 입력해주세요.'
              onChange={(e) => {
                setPostData({ ...postData, title: e.target.value });
              }}
              value={postData.title}
              className='post-title'
            />
          </div>
          <div className='post-files-container'>
            <UploadFiles
              setFiles={setFiles}
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              accept={ACCEPTABLE.join()}
              buttonText='사진 추가'
              buttonIcon={faImage}
              previewSize={102}
            />
          </div>
          <div className='post-content-container'>
            <textarea
              placeholder='나누고 싶은 이야기를 적어주세요.'
              className='post-content'
              value={postData.content}
              onChange={(e) => {
                setPostData({ ...postData, content: e.target.value });
              }}
            />
          </div>
          <div className='button-container'>
            <button className='post-button' onClick={doUpdate}>
              수정 완료
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UpdatePostModal;
