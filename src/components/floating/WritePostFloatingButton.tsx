import { Dispatch, SetStateAction, useState } from 'react';
import WritePostModal from '../modal/WritePostModal';
import { Fab, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

function WritePostFloatingButton({
  setDidPost = undefined,
}: {
  setDidPost?: Dispatch<SetStateAction<boolean>>;
}) {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <Fab className='write-post-floating-button fixed! bottom-20 right-4 bg-brand1!'>
        <WritePostModal
          showModal={showModal}
          setShowModal={setShowModal}
          setDidPost={setDidPost}
        />
        <IconButton onClick={() => setShowModal(true)}>
          <FontAwesomeIcon icon={faPen} color='white' />
        </IconButton>
      </Fab>
    </>
  );
}

export default WritePostFloatingButton;
