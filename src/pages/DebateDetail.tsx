import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons/faCartPlus';
import {
  faBars,
  faChevronRight,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import ProfileIcon from '@/components/base/ProfileIcon';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DebateType, PaymentType } from '@/types/data';
import { InitialDebate } from '@/types/initialValue';
import { getCategoryFromNumber, getDateTime, getTimeDiff } from '@/functions';
import Image from '@/components/base/Image';
import { selectUser } from '@/stores/user';
import { useAppSelector } from '@/stores/hooks';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Paper,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

function DebateDetail() {
  const { t } = useTranslation();

  const { debate_id } = useParams();
  const [debate, setDebate] = useState<DebateType>(InitialDebate);

  const [purchaseId, setPurchaseId] = useState<number>(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/debate/${debate_id}`).then((res) => {
      let { data }: { data: DebateType } = res;
      setDebate(data);
    });
  }, [debate_id]);

  const doPurchase = () => {
    // 추후 PG사 연동하여 API 작성
    // 현재는 결제 API가 없으므로 무조건 성공으로 가정
    console.log({
      product_type: 'D',
      product_id: debate.id,
      price: debate.price,
      quantity: 1,
    });
    axios.post(`/api/purchase`, {
      product_type: 'D',
      product_id: debate.id,
      price: debate.price,
      quantity: 1,
    });
  };

  const cancelPurchase = () => {
    axios.delete(`/api/purchase/${purchaseId}`).then((res) => {
      console.log('Cancelled', res.data);
    });
  };

  const getPurchase = () => {
    axios.get(`/api/purchase/D/${debate.id}`).then((res) => {
      let { data }: { data: PaymentType } = res;
      setPurchaseId(data.id);
      console.log(data);
    });
  };

  const doDelete = () => {
    axios.delete(`/api/debate/${debate.id}`).then(() => {
      navigate('/debate');
    });
  };

  return (
    <div id='debate-detail' className='m-4! md:ml-24! md:mt-12!'>
      <div className='user-header'>
        <div className='user-header__info'>
          <ProfileIcon
            profile={debate.user.profile}
            size={40}
            className='user-header__avatar'
          />
          <div className='user-header__text'>
            <span className='user-header__nickname'>{debate.user.name}</span>
            <span className='user-header__time'>
              {getTimeDiff(debate.created)}
            </span>
          </div>
        </div>

        <div className='user-header__actions'>
          <div className='for-pc hidden md:block'>
            {user.id === debate.user.id && (
              <>
                <button>수정</button>
                <button className='delete'>삭제</button>
              </>
            )}
          </div>

          <div className='for-mobile md:hidden'>
            <IconButton
              className='drawer-button md:hidden!'
              onClick={() => setDrawerOpen(true)}
            >
              <FontAwesomeIcon icon={faBars} />
            </IconButton>
            <Drawer
              anchor='bottom'
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              PaperProps={{
                sx: {
                  bgcolor: 'transparent',
                },
              }}
            >
              <Paper className='rounded-t-2xl!'>
                <hr className='w-15 h-1 mx-auto my-4 bg-gray-100 border-0 rounded-sm dark:bg-gray-700' />
                <p className='text-center'>게시글 옵션</p>
                <List>
                  <ListItem>
                    <ListItemButton
                      className='edit'
                      onClick={() => alert('미구현입니당')}
                    >
                      <ListItemIcon>
                        <FontAwesomeIcon icon={faPen} />
                      </ListItemIcon>
                      수정
                    </ListItemButton>
                  </ListItem>
                  <ListItem>
                    <ListItemButton className='delete' onClick={doDelete}>
                      <ListItemIcon>
                        <FontAwesomeIcon icon={faTrash} />
                      </ListItemIcon>
                      삭제
                    </ListItemButton>
                  </ListItem>
                </List>
              </Paper>
            </Drawer>
          </div>
        </div>
      </div>

      <div className='discussion-info'>
        <h2 className='discussion-info__title'>{debate.title}</h2>

        <div className='discussion-info-list'>
          <DebateDetailListItem name='모임 장소'>
            {debate.location}
          </DebateDetailListItem>

          <DebateDetailListItem name='온라인 링크'>
            <a
              className='whitespace-nowrap overflow-hidden text-ellipsis block'
              href={debate.link}
            >
              {debate.link}
            </a>
          </DebateDetailListItem>

          <DebateDetailListItem name='시간'>
            {getDateTime(new Date(debate.held_at))}
          </DebateDetailListItem>

          <DebateDetailListItem name='카테고리'>
            {getCategoryFromNumber(debate.category)
              .map((category) => t(category.name))
              .join(', ')}
          </DebateDetailListItem>

          <DebateDetailListItem name='지정 도서'>
            <div>
              <span>{debate.book.title}</span>
              <Image
                src={debate.book.image}
                width='100px'
                height='140px'
                className='discussion-info__cover'
              />
            </div>
          </DebateDetailListItem>
        </div>

        <pre className='discussion-info__description'>{debate.content}</pre>

        <div className='discussion-info__likes'>
          <FontAwesomeIcon icon={faHeart} className='like-icon' />
          <span className='discussion-info__likes__text'>
            {debate.likes_num}
          </span>
        </div>
      </div>
      <div className='payment-box'>
        <p className='payment-box__title'>
          토론방에 참여하시려면 결제가 필요합니다.
        </p>

        <div className='payment-box__info'>
          <button
            className='payment-box__currency'
            onClick={() => cancelPurchase()} // 결제 테스트용
          >
            <FontAwesomeIcon icon={faCartPlus} />
            {''} 찜
          </button>
          <span
            className='payment-box__amount'
            onClick={getPurchase} // 결제 테스트용
          >
            1,000 원
          </span>
          <button className='payment-box__button' onClick={doPurchase}>
            결제하기{' '}
            <FontAwesomeIcon
              icon={faChevronRight}
              className='payment-box__button-icon'
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DebateDetail;

function DebateDetailListItem({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className='list-row flex my-1!'>
      <div className='flex-none flex justify-center items-center w-[100px] p-1! rounded-[5px] bg-brand3'>
        <strong className='font-medium! text-brand1 '>{name}</strong>
      </div>
      <div className='grow ml-2! p-1! min-w-0'>{children}</div>
    </div>
  );
}
