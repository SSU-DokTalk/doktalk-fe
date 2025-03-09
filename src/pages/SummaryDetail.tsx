import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import {
  faBars,
  faHeart as faHeartSolid,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons/faCartPlus';
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

  const doPurchase = () => {
    // 추후 PG사 연동하여 API 작성
    // 현재는 결제 API가 없으므로 무조건 성공으로 가정
    axios
      .post(`/api/purchase`, {
        product_type: 'S',
        product_id: summary.id,
        content: '요약 구매',
        price: summary.price,
        quantity: 1,
      })
      .then(() => {
        getPurchase(parseInt(summary_id ?? '0'));
      });
  };

  const cancelPurchase = () => {
    axios.delete(`/api/purchase/${purchaseId}`);
  };

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

  const doDelete = () => {
    axios.delete(`/api/summary/${summary.id}`).then(() => {
      navigate('/summary');
    });
  };

  return (
    <div id='summary-detail'>
      <div className='container md:w-7/10!'>
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
                  <button className='edit'>수정</button>
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
            )}
          </div>
        </div>
        <div className='content'>
          <h2 className='title'>{summary.title}</h2>
          <div className='additional-info'>
            <div className='item'>
              <div className='label'>카테고리</div>
              <div className='content'>
                {getCategoryFromNumber(summary.category)
                  .map((category) => t(category.name))
                  .join(', ')}
              </div>
            </div>
            <div className='item'>
              <div className='label'>지정 도서</div>
              <div className='content'>
                <span>{summary.book.title}</span>
                <Image src={summary.book.image} width='100px' height='140px' />
              </div>
            </div>
          </div>

          <pre className='content__text free-content'>
            {summary.free_content}
          </pre>

          {purchaseId == 0 ? (
            <div className='payment__container'>
              <pre className='content__text charged-content'>
                {summary.charged_content}
              </pre>
              <div className='payment__box '>
                <p className='payment__box__title'>
                  이어서 읽으시려면 결제가 필요합니다.
                </p>

                <div className='payment__box__info'>
                  <button
                    className='box into-cart'
                    onClick={() => cancelPurchase()} // 결제 테스트용
                  >
                    <FontAwesomeIcon icon={faCartPlus} />
                    {''} 찜
                  </button>
                  <button
                    className='box purchase'
                    onClick={doPurchase} // 결제 테스트용
                  >
                    <span className='price'>{summary.price} 원</span>
                    <span className='do-purchase'>결제하기 →</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <pre className='content__text'>{summary.charged_content}</pre>
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
      </div>
      <div className='offset hidden md:block'></div>
    </div>
  );
}

export default SummaryDetail;
