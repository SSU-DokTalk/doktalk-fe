import axios from 'axios';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { useAppDispatch, useAppSelector } from '@/stores/hooks';
import { selectUser, setUser } from '@/stores/user';
import ProfileIcon from '@/components/base/ProfileIcon';
import { useTranslation } from 'react-i18next';

function EditProfileModal({
  showModal,
  setShowModal,
  setDidEdit,
}: {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setDidEdit: Dispatch<SetStateAction<boolean>>;
}) {
  const [userInfo, setUserInfo] = useState<{
    profile: string | undefined;
    name: string;
    introduction: string;
  }>({
    profile: undefined,
    name: '',
    introduction: '',
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const { t } = useTranslation();

  useEffect(() => {
    if (user.id != 0 && showModal) {
      axios.get(`/api/user/me`).then((res) => {
        let { profile, name, introduction } = res.data;
        setUserInfo({ profile, name, introduction });
      });
    }
  }, [showModal]);

  const updateUserInfo = () => {
    axios.patch(`/api/user/me`, userInfo).then(async (res) => {
      let { id, name, profile, role } = res.data;
      await dispatch(setUser({ id, name, profile, role }));
      setDidEdit(true);
    });
  };

  const clickUploadImageButton = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const uploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const formData = new FormData();
      formData.append('file', e.target.files[0]);

      axios
        .post(`/api/file`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          params: {
            directory: 'profile',
          },
        })
        .then(async (res) => {
          let { data } = res;
          let updatedUserInfo = { ...userInfo, profile: data };
          await setUserInfo(updatedUserInfo);

          axios.patch(`/api/user/me`, updatedUserInfo).then(async (res) => {
            let { id, name, profile, role } = res.data;
            await dispatch(setUser({ id, name, profile, role }));
            setDidEdit(true);
          });
        });
    },
    [userInfo]
  );

  const deleteImage = () => {
    axios.delete(`/api/user/profile`).then(async () => {
      setUserInfo({ ...userInfo, profile: undefined });
      await dispatch(setUser({ ...user, profile: undefined }));
      setDidEdit(true);
    });
  };

  return (
    <Dialog
      id='edit-profile-modal'
      open={showModal}
      onClose={() => setShowModal(false)}
      maxWidth='sm'
      fullWidth
      scroll='body'
    >
      <DialogTitle>{t('component.modal.edit-profile.title')}</DialogTitle>
      <IconButton
        className='btn-close'
        aria-label='close'
        onClick={() => setShowModal(false)}
        sx={{ position: 'absolute', right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent dividers>
        <div className='profile-image-container'>
          <ProfileIcon
            profile={userInfo.profile}
            alt='user icon'
            className='profile-image'
            size={176}
          />
          <div className='profile-image-button-container'>
            <input
              className='profile-image-input'
              type='file'
              accept='.jpg, .jpeg, .png, .gif'
              name='profile'
              ref={inputRef}
              onChange={uploadImage}
            />
            <Button
              className='profile-image-button image-upload'
              onClick={clickUploadImageButton}
            >
              {t('component.modal.edit-profile.button.image-upload')}
            </Button>
            <Button
              className='profile-image-button image-delete'
              onClick={deleteImage}
            >
              {t('component.modal.edit-profile.button.image-remove')}
            </Button>
          </div>
        </div>
        <div className='user-info-container'>
          <div className='attribute-container'>
            <div className='attribute'>
              {t('component.modal.edit-profile.label.nickname')}
            </div>
            <input
              className='nickname'
              type='text'
              placeholder={t(
                'component.modal.edit-profile.placeholder.nickname'
              )}
              value={userInfo.name!}
              onChange={(e) =>
                setUserInfo({ ...userInfo, name: e.target.value })
              }
            />
          </div>

          <div className='attribute-container'>
            <div className='attribute'>
              {t('component.modal.edit-profile.label.introduction')}
            </div>
            <textarea
              className='introduction'
              placeholder={t(
                'component.modal.edit-profile.placeholder.introduction'
              )}
              value={userInfo.introduction!}
              onChange={(e) =>
                setUserInfo({ ...userInfo, introduction: e.target.value })
              }
            />
          </div>
        </div>
        <div className='submit-button-container'>
          <div className='submit-button-offset' />
          <button className='submit-user-info' onClick={updateUserInfo}>
            {t('component.modal.edit-profile.button.submit')}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileModal;
