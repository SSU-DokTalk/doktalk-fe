import { DUMMY_DEBATES } from '@/common/dummy_data';
import { DebateType } from '@/types/data';
import { useEffect, useState } from 'react';
import CarouselDebateCard from '../card/CarouselDebateCard';
import Carousel from '@/components/carousel/Carousel';
import { useAppSelector } from '@/stores/hooks';
import { selectUser } from '@/stores/user';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

import { isMd } from '@/functions/breakpoint';
import { MiddlePanel, RightPanel } from '../panel/sidePanel';

function LandingUpper() {
  const user = useAppSelector(selectUser);
  const [debates, setDebates] = useState<DebateType[]>(DUMMY_DEBATES);

  const { t } = useTranslation();

  useEffect(() => {
    axios.get(`/api/debate/recommend`).then((res) => {
      let { items } = res.data;
      setDebates(items);
    });
  }, []);

  return (
    <div className='flex'>
      <MiddlePanel id='landing-page-upper-container' className='mb-8 md:mb-15!'>
        <div className='container-title'>
          {t('page.landing.title.recommend-prefix')}
          {user.id == 0 ? null : (
            <span>
              {t('page.landing.title.for-you-prefix')}
              <span className='user-name'>{user.name}</span>
              {t('page.landing.title.for-you-postfix')}
            </span>
          )}
          {t('page.landing.title.recommend-postfix')}
        </div>

        <Carousel size={isMd() ? 3 : 1} className='container-contents-carousel'>
          {debates.map((debate, idx) => (
            <CarouselDebateCard
              key={'recommend-debate' + idx}
              debate={debate}
            />
          ))}
        </Carousel>
      </MiddlePanel>

      <RightPanel />
    </div>
  );
}

export default LandingUpper;
