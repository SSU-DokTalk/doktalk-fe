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
import { PostType } from '@/types/data';
import { getFileTypeFromUrl, getTimeDiff } from '@/functions';
import { selectUser } from '@/stores/user';
import { useAppSelector } from '@/stores/hooks';
import { InitialPost } from '@/types/initialValue';
import axios from 'axios';
import CommentSection from '../components/section/CommentSection';
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
import UpdatePostModal from '@/components/modal/UpdatePostModal';

function PostDetail() {
  const { post_id } = useParams();
  const [post, setPost] = useState<PostType>(InitialPost);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [didPost, setDidPost] = useState<boolean>(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/post/${post_id}`).then((res) => {
      let { data }: { data: PostType } = res;
      setPost(data);
    });
    axios
      .get(`/api/posts/like`, {
        params: {
          ids: post_id,
        },
      })
      .then((res) => {
        let { data }: { data: boolean[] } = res;
        setHasLiked(data[0]);
      });
  }, [post_id, didPost]);

  const doLike = () => {
    // Like API 호출
    axios.post(`/api/post/${post.id}/like`).then(() => {
      // 좋아요 성공
      setHasLiked(true);
      post.likes_num++;
    });
  };

  const doUnlike = () => {
    axios.delete(`/api/post/${post.id}/like`).then(() => {
      setHasLiked(false);
      post.likes_num--;
    });
  };

  const doDelete = () => {
    axios.delete(`/api/post/${post.id}`).then(() => {
      navigate('/');
    });
  };

  return (
    <div id='post-detail'>
      <MiddlePanel>
        <div className='header'>
          <ProfileIcon profile={post.user.profile} size={50} />
          <div className='header__container'>
            <div className='user-info'>
              <div className='nickname'>{post.user.name}</div>
              <div className='time'>{getTimeDiff(post.created)}</div>
            </div>
            {post.user.id == user.id && (
              <div className='actions'>
                <div className='for-pc hidden md:block'>
                  <UpdatePostModal
                    post={post}
                    isEdit={true}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    setDidPost={setDidPost}
                  />
                  <button className='edit' onClick={() => setShowModal(true)}>
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
                          <ListItemButton
                            className='edit'
                            onClick={() => setShowModal(true)}
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
          <div className='title'>{post.title}</div>
          <pre className='content__text'>{post.content}</pre>
          <div className='content__image-container'>
            {post.files
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
            {post.files
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
            <span className='content__like'>{post.likes_num}</span>
          </div>
        </div>
        <CommentSection
          itemType='post'
          itemId={post.id}
          total={post.comments_num}
          setItem={setPost}
          api={`post/${post.id}/comment`}
          commentsApi={`post/${post.id}/comments`}
          commentLikesApi={`post/comments/like`}
        />
      </MiddlePanel>

      <RightPanel />
    </div>
  );
}

export default PostDetail;
