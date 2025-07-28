import { useAppSelector } from '@/stores/hooks';
import { selectUser } from '@/stores/user';

import ProfileIcon from '@/components/base/ProfileIcon';
import { useNavigate } from 'react-router-dom';
import WriteIcon from '@/assets/images/write.svg?react';
import { useTranslation } from 'react-i18next';

function WriteSummaryCard() {
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  return (
    <div id='write-summary-card'>
      <ProfileIcon profile={user.profile} size={45} />
      <div
        className='input-container'
        onClick={() => navigate('/summary/create')}
      >
        <div className='write-input'>
          {t('component.card.write-summary.placeholder')}
        </div>
        <WriteIcon className='write-icon' width={20} fill={'#666565'} />
      </div>
    </div>
  );
}

export default WriteSummaryCard;
