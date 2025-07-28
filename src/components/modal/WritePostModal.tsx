import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import UploadFiles from '@/components/base/UploadFiles';
import { ACCEPTABLE } from '@/common/variables';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { PostType } from '@/types/data';
import { useTranslation } from 'react-i18next';

function WritePostModal({
  post,
  showModal,
  setShowModal,
  isEdit = false,
  setDidPost = undefined,
}: {
  post?: PostType;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  isEdit?: boolean;
  setDidPost?: Dispatch<SetStateAction<boolean>>;
}) {
  const { t } = useTranslation();
  const [postData, setPostData] = useState<{
    title: string;
    content: string;
  }>({
    title: '',
    content: '',
  });
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (isEdit && post) {
      setPostData({
        title: post.title,
        content: post.content,
      });
    }
  }, [isEdit, post]);

  const doPost = async () => {
    const filesRes = await Promise.all(
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
      .post('/api/post', {
        ...postData,
        files: filesRes,
      })
      .then(() => {
        setShowModal(false);
        setPostData({
          title: '',
          content: '',
        });
        setFiles([]);
        setDidPost?.(true);
      });
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
        <b>{t('component.modal.write-post.title')}</b>
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
              placeholder={t('component.modal.write-post.placeholder.title')}
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
              accept={ACCEPTABLE.join()}
              buttonText={t('component.modal.write-post.button.add-photo')}
              buttonIcon={faImage}
              previewSize={102}
            />
          </div>
          <div className='post-content-container'>
            <textarea
              placeholder={t('component.modal.write-post.placeholder.content')}
              className='post-content'
              value={postData.content}
              onChange={(e) => {
                setPostData({ ...postData, content: e.target.value });
              }}
            />
          </div>
          <div className='button-container'>
            <button className='temporary-save-button'>
              {t('component.modal.write-post.button.temp-save')}
            </button>
            <button className='post-button' onClick={doPost}>
              {t('component.modal.write-post.button.submit')}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default WritePostModal;
