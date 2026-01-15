import { useEffect, useState } from 'react';

import { PostType, SummaryType } from '@/types/data';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { DebateType } from '@/types/data';
import LandingDebateCard from '@/components/card/LandingDebateCard';
import LandingSummaryCard from '@/components/card/LandingSummaryCard';
import LandingPostCard from '@/components/card/LandingPostCard';
import { useNavigate } from 'react-router-dom';
import WriteIcon from '@/assets/images/write.svg?react';
import WritePostModal from '@/components/modal/WritePostModal';

function Landing() {
  const navigate = useNavigate();
  const [recommendDebates, setRecommendDebates] = useState<DebateType[]>([]);
  const [recommendSummaries, setRecommendSummaries] = useState<SummaryType[]>(
    []
  );
  const [showModal, setShowModal] = useState<boolean>(false);

  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state

      const results = await Promise.allSettled([
        fetch('/api/post/recent?page=1&size=6'),
        axios.get('/api/debate/popular'),
        axios.get('/api/summary/popular'),
      ]);

      const [postsResult, debatesResult, summariesResult] = results;

      // Handle Posts
      if (postsResult.status === 'fulfilled') {
        const response = postsResult.value;
        if (response.ok) {
          try {
            const data = await response.json();
            setPosts(data.items || []);
          } catch (e) {
            console.error('Error parsing posts JSON:', e);
            setPosts([]);
          }
        } else {
          console.error('Posts fetch failed with status:', response.status);
          setPosts([]);
        }
      } else {
        console.error('Posts fetch rejected:', postsResult.reason);
        setPosts([]);
      }

      // Handle Debates
      if (debatesResult.status === 'fulfilled') {
        setRecommendDebates(debatesResult.value.data || []);
      } else {
        console.error('Debates fetch rejected:', debatesResult.reason);
        setRecommendDebates([]);
      }

      // Handle Summaries
      if (summariesResult.status === 'fulfilled') {
        setRecommendSummaries(summariesResult.value.data || []);
      } else {
        console.error('Summaries fetch rejected:', summariesResult.reason);
        setRecommendSummaries([]);
      }

      setLoading(false);
    };

    fetchData();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-lg text-gray-700'>{t('page.landing.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-lg text-red-600'>
          {t('page.landing.error')}: {error}
        </p>
      </div>
    );
  }

  return (
    <div id='landing-page'>
      <WritePostModal showModal={showModal} setShowModal={setShowModal} />
      <div className='h-4'></div>

      {/* 추천 토론방 섹션 */}
      <div className='landing-section'>
        <div className='section-header'>
          <h2>{t('page.landing.title.recommend-postfix')}</h2>
          <button className='more-btn' onClick={() => navigate('/debate')}>
            더보기
            <span>+</span>
          </button>
        </div>
        <div className='horizontal-scroll'>
          {recommendDebates.map((debate, idx) => (
            <LandingDebateCard
              key={'recommend-debate-' + idx}
              debate={debate}
            />
          ))}
        </div>
      </div>

      {/* 인기 요약 섹션 */}
      <div className='landing-section'>
        <div className='section-header'>
          <h2>인기 요약</h2>
          <button className='more-btn' onClick={() => navigate('/summary')}>
            더보기
            <span>+</span>
          </button>
        </div>
        <div className='horizontal-scroll'>
          {recommendSummaries.map((summary, index) => (
            <LandingSummaryCard
              key={'popular-summary-' + index}
              summary={summary}
            />
          ))}
        </div>
      </div>

      {/* 게시글 섹션 */}
      <div className='landing-section'>
        <div className='section-header'>
          <h2>게시글</h2>
          <button className='write-btn' onClick={() => setShowModal(true)}>
            <span>게시글 쓰기</span>
            <WriteIcon className='write-icon' width={17} fill={'#ffffff'} />
          </button>
        </div>
        {posts.length === 0 ? (
          <p className='no-content'>{t('page.landing.item.no-post-item')}</p>
        ) : (
          <div className='post-list'>
            {posts.map((post) => (
              <LandingPostCard
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                thumbnail={post.files?.[0]?.url}
                likeCount={post.likes_num || 0}
                commentCount={post.comments_num || 0}
                author={post.user.name || '익명'}
                createdAt={post.created}
              />
            ))}
          </div>
        )}
        <button className='more-btn' onClick={() => navigate('/post')}>
          더보기
          <span>+</span>
        </button>
      </div>
    </div>
  );
}

export default Landing;
