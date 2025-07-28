import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import {
  faBars,
  faHeart as faHeartSolid,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import ProfileIcon from '@/components/base/ProfileIcon';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PaymentType, SummaryType } from '@/types/data';
import {
  getCategoryFromNumber,
  getFileTypeFromUrl,
  getTimeDiff,
} from '@/functions';
import Image from '@/components/base/Image';
import { selectUser } from '@/stores/user';
import { useAppSelector } from '@/stores/hooks';
import { InitialSummary } from '@/types/initialValue';
import CommentSection from '../components/section/CommentSection';
import { useTranslation } from 'react-i18next';
import { ACCEPTABLE_FILE, ACCEPTABLE_IMAGE } from '@/common/variables';
import FileCard from '@/components/card/FileCard';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Paper,
} from '@mui/material';
import { MiddlePanel, RightPanel } from '@/components/panel/sidePanel';
import { CheckoutContainer } from '@/components/Payments/CheckoutContainer';

function SummaryDetail() {
  const { summary_id } = useParams();
  const [summary, setSummary] = useState<SummaryType>(InitialSummary);
  const [purchaseId, setPurchaseId] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getPurchase = (summary_id: number) => {
    axios.get(`/api/purchase/S/${summary_id}`).then((res) => {
      let { data }: { data: PaymentType } = res;
      setPurchaseId(data.id);
      axios.get(`/api/summary/${summary_id}/charged_content`).then((res) => {
        setSummary({ ...summary, charged_content: res.data });
      });
    });
  };

  useEffect(() => {
    if (parseInt(summary_id ?? '0') == 0) return;
    axios.get(`/api/summary/${summary_id}`).then((res) => {
      let { data }: { data: SummaryType } = res;
      setSummary(data);
    });

    axios
      .get(`/api/summarys/like`, {
        params: {
          ids: summary_id,
        },
      })
      .then((res) => {
        let { data }: { data: boolean[] } = res;
        setHasLiked(data[0]);
      });

    getPurchase(parseInt(summary_id ?? '0'));
  }, [summary_id, purchaseId]);

  // const doPurchase = () => {
  //   // 추후 PG사 연동하여 API 작성
  //   // 현재는 결제 API가 없으므로 무조건 성공으로 가정
  //   axios
  //     .post(`/api/purchase`, {
  //       product_type: 'S',
  //       product_id: summary.id,
  //       content: '요약 구매',
  //       price: summary.price,
  //       quantity: 1,
  //     })
  //     .then(() => {
  //       getPurchase(parseInt(summary_id ?? '0'));
  //     });
  // };

  // const cancelPurchase = () => {
  //   axios.delete(`/api/purchase/${purchaseId}`);
  // };

  const doLike = () => {
    // Like API 호출
    axios.post(`/api/summary/${summary.id}/like`).then(() => {
      // 좋아요 성공
      setHasLiked(true);
      summary.likes_num++;
    });
  };

  const doUnlike = () => {
    axios.delete(`/api/summary/${summary.id}/like`).then(() => {
      setHasLiked(false);
      summary.likes_num--;
    });
  };

  const doUpdate = () => {
    navigate('./update');
  };

  const doDelete = () => {
    // TODO: 삭제전 경고
    axios.delete(`/api/summary/${summary.id}`).then(() => {
      navigate('/summary');
    });
  };

  return (
    <div id='summary-detail' className='flex'>
      <MiddlePanel>
        <div className='header'>
          <ProfileIcon profile={summary.user.profile} size={50} />
          <div className='header__container'>
            <div className='user-info'>
              <div className='nickname'>{summary.user.name}</div>
              <div className='time'>{getTimeDiff(summary.created)}</div>
            </div>
            {summary.user.id == user.id && (
              <div className='actions'>
                <div className='for-pc hidden md:block'>
                  <button className='edit' onClick={doUpdate}>
                    수정
                  </button>
                  <button className='delete' onClick={doDelete}>
                    삭제
                  </button>
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
                      <hr className='w-15 h-1 mx-auto! my-4! bg-gray-100 border-0 rounded-sm dark:bg-gray-700' />
                      <p className='text-center'>게시글 옵션</p>
                      <List>
                        <ListItem>
                          <ListItemButton className='edit' onClick={doUpdate}>
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
            )}
          </div>
        </div>
        <div className='content'>
          <h2 className='title'>{summary.title}</h2>

          <div className='additional-info'>
            <SummaryDetailListItem name='카테고리'>
              {getCategoryFromNumber(summary.category)
                .map((category) => t(category.name))
                .join(', ')}
            </SummaryDetailListItem>

            <SummaryDetailListItem name='지정 도서'>
              <div className='content'>
                <span>{summary.book.title}</span>
                <Image src={summary.book.image} width='100px' height='140px' />
              </div>
            </SummaryDetailListItem>
          </div>

          <pre className='content__text free-content  whitespace-pre-wrap break-words'>
            {summary.free_content}
          </pre>

          {purchaseId == 0 ? (
            <CheckoutContainer
              checkoutAmount={{
                value: 100,
                currency: 'KRW',
              }}
              checkoutData={{
                orderId: 'H_9uNV6Uz4Kt-eM9GrGYG', // random id
                orderName: '독톡 테스트용',
              }}
              charged_content={''}
              tmp={{
                // 아직 백엔드를 제대로 구현하지 않아서 기존에 있던 더미 api 사용
                product_type: 'S',
                product_id: summary.id,
                content: '요약 구매',
                price: summary.price,
                quantity: 1,
              }}
            />
          ) : (
            <pre className='content__text whitespace-pre-wrap break-words'>
              {summary.charged_content}
            </pre>
          )}

          <div className='content__image-container'>
            {summary.files
              ?.filter((file) =>
                ACCEPTABLE_IMAGE.includes(`.${getFileTypeFromUrl(file.url)}`)
              )
              .map((file, idx) => {
                return (
                  <img
                    key={'img' + idx}
                    className='content__image'
                    src={file.url}
                    alt='content'
                  />
                );
              })}
          </div>
          <div className='content__file-container'>
            {summary.files
              ?.filter((file) =>
                ACCEPTABLE_FILE.includes(`.${getFileTypeFromUrl(file.url)}`)
              )
              .map((file, idx) => {
                return (
                  <FileCard
                    key={'file' + idx}
                    file={file}
                    className='content__file'
                  />
                );
              })}
          </div>

          <div className='content__like-container'>
            {hasLiked ? (
              <FontAwesomeIcon
                icon={faHeartSolid}
                fontSize={20}
                className='like-icon liked'
                onClick={doUnlike}
              />
            ) : (
              <FontAwesomeIcon
                icon={faHeartRegular}
                fontSize={20}
                className='like-icon'
                onClick={doLike}
              />
            )}
            <span className='content__like'>{summary.likes_num}</span>
          </div>
        </div>

        <CommentSection
          itemType='summary'
          itemId={summary.id}
          total={summary.comments_num}
          setItem={setSummary}
          api={`summary/${summary.id}/comment`}
          commentsApi={`summary/${summary.id}/comments`}
          commentLikesApi={`summary/comments/like`}
        />
      </MiddlePanel>

      <RightPanel />
    </div>
  );
}

export default SummaryDetail;

function SummaryDetailListItem({
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
