import { useEffect, useRef, useState } from 'react';

import { PostType, SummaryType } from '@/types/data';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { DebateType } from '@/types/data';
import LandingDebateCard from '@/components/card/LandingDebateCard';
import LandingSummaryCard from '@/components/card/LandingSummaryCard';
import LandingPostCard from '@/components/card/LandingPostCard';
import { useNavigate } from 'react-router-dom';
import WriteIcon from '@/assets/images/write.svg?react';
import { PostComposer } from '@/features/post/components/PostComposer';

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

  // 카로셀 상태 및 로직
  const carouselRef = useRef<HTMLDivElement>(null);

  const getScrollAmount = () => {
    if (carouselRef.current) {
      const card = carouselRef.current.firstElementChild as HTMLElement;
      if (card) {
        // 카드 너비 + gap (12px)
        return card.offsetWidth + 12;
      }
    }
    return 300; // 기본값
  };

  const goToPrevDebates = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -getScrollAmount(),
        behavior: 'smooth',
      });
    }
  };

  const goToNextDebates = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: getScrollAmount(),
        behavior: 'smooth',
      });
    }
  };

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
      <PostComposer
        open={showModal}
        onOpenChange={setShowModal}
        onSaved={(id) => navigate(`/post/${id}`)}
      />

      {/* 추천 토론방 섹션 */}
      <div className='landing-section debate-section'>
        <div className='section-header tab-style'>
          <h2>{t('page.landing.title.recommend')} 💬</h2>
        </div>

        {recommendDebates.length === 0 ? (
          <p className='no-content'>{t('page.landing.item.no-debate-item')}</p>
        ) : (
          <div className='relative-container'>
            {/* 좌측 화살표 버튼 */}
            <button
              className='scroll-nav prev'
              onClick={goToPrevDebates}
              aria-label={t('page.landing.button.previous')}
            >
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>

            <div className='carousel-wrapper'>
              <div className='carousel-header'>
                <button
                  className='more-btn'
                  onClick={() => navigate('/debate')}
                >
                  {t('page.landing.button.more')}
                </button>
              </div>
              <div className='carousel-container' ref={carouselRef}>
                {recommendDebates.map((debate, idx) => (
                  <LandingDebateCard
                    key={'recommend-debate-' + idx}
                    debate={debate}
                  />
                ))}
              </div>
            </div>

            {/* 우측 화살표 버튼 */}
            <button
              className='scroll-nav next'
              onClick={goToNextDebates}
              aria-label={t('page.landing.button.next')}
            >
              <svg viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* 인기 요약 섹션 */}
      <div className='landing-section summary-section'>
        <div className='section-header'>
          <h2>{t('page.landing.title.popular-summary')} 🔥</h2>
          <button className='more-btn' onClick={() => navigate('/summary')}>
            {t('page.landing.button.more')}
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
      <div className='landing-section post-section'>
        <div className='section-header'>
          <h2>{t('page.landing.title.post')} ✏️</h2>
          <button className='write-btn' onClick={() => setShowModal(true)}>
            <span>{t('page.landing.button.write-post')}</span>
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
          {t('page.landing.button.more')}
        </button>
      </div>
    </div>
  );
}

export default Landing;
