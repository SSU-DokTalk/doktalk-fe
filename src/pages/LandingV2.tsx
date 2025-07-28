import { useEffect, useState } from 'react';

import InfiniteScroll from '@/components/base/InfiniteScroll';
import { PostType, SummaryType } from '@/types/data';
import { useAppSelector } from '@/stores/hooks';
import { selectUser } from '@/stores/user';
import WritePostCard from '@/components/card/WritePostCard';
import WritePostFloatingButton from '@/components/floating/WritePostFloatingButton';
import PopularSummaryCard from '../components/card/PopularSummaryCard';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { MiddlePanel, RightPanel } from '@/components/panel/sidePanel';
import SimplePostCard from '@/components/card/SimplePostCard';
import LandingUpper from '@/components/section/LandingUpper';
import { DebateType } from '@/types/data';
import { DUMMY_DEBATES } from '@/common/dummy_data';
import Carousel from '@/components/carousel/Carousel';
import { isMd } from '@/functions/breakpoint';
import CarouselDebateCard from '@/components/card/CarouselDebateCard';

function LandingV2() {
  const [debates, setDebates] = useState<DebateType[]>(DUMMY_DEBATES);

  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [popularSummaries, setPopularSummaries] = useState<SummaryType[]>([]);
  const [popularSummaryLikes, setPopularSummaryLikes] = useState<number[]>([]);
  const [isPopularSummaryLoaded, setIsPopularSummaryLoaded] =
    useState<boolean>(false);

  const { t } = useTranslation();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/post/recent?page=1&size=6');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data.items);
      } catch (e: any) {
        setError(e.message);
        console.error('Failed to fetch posts:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  useEffect(() => {
    if (popularSummaries.length === 0 && !isPopularSummaryLoaded) {
      axios
        .get(`/api/summary/popular`)
        .then(async (res) => {
          let { data: items }: { data: SummaryType[] } = res;
          setPopularSummaries(items);

          if (user.id == 0) return;

          await axios
            .get(
              `/api/summarys/like?${items
                .map((item) => 'ids=' + item.id)
                .join('&')}`
            )
            .then(
              (res) => {
                let { data: itemLikes }: { data: number[] } = res;
                setPopularSummaryLikes((prev) => [...prev, ...itemLikes]);
              },
              () => {
                setPopularSummaryLikes(new Array(items.length).fill(false));
              }
            );
        })
        .finally(() => {
          setIsPopularSummaryLoaded(true);
        });
    }
  });

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-lg text-gray-700'>로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-lg text-red-600'>
          데이터를 불러오는 데 실패했습니다: {error}
        </p>
      </div>
    );
  }

  return (
    <div id='landing-page' className='flex flex-col'>
      <div
        id='landing-page-upper-container'
        className='pb-8! mb-8! md:pb-15! md:mb-15!'
      >
        <div className='container-title md:ml-8! px-24!'>
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

        <div className='container-contents-carousel flex items-end justify-items-center gap-4 overflow-x-auto h-72 w-full px-24!'>
          {debates.map((debate, idx) => (
            <SimplePostCard
              key={'recommend-debate' + idx}
              title={debate.title}
              content={debate.content}
              thumbnail={debate.book.image}
              navigateTo={`/debate/${debate.id}`}
              width={idx === 0 ? 'w-64 flex-shrink-0' : 'w-48 flex-shrink-0'}
              imageHeight={idx === 0 ? 'h-48' : 'h-32'}
            />
          ))}
        </div>
      </div>

      <div className='flex flex-row md:pl-24! pr-12'>
        <MiddlePanel className='post-container px-4! w-full'>
          <div className='container mx-auto px-4 py-8'>
            <h1 className='text-3xl! font-bold! text-brand1 mb-6!'>게시글</h1>
            {posts.length === 0 ? (
              <p className='text-gray-600'>표시할 게시글이 없습니다.</p>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2'>
                {posts.map((post) => (
                  <SimplePostCard
                    key={post.id}
                    title={post.title}
                    content={post.content}
                    thumbnail={post.files?.[0].url}
                    navigateTo={`/post/${post.id}`}
                  />
                ))}
              </div>
            )}
          </div>
        </MiddlePanel>

        <RightPanel>
          <div className='summary-container ml-4! mr-8!'>
            <div className='summary-section-title'>
              {t('page.landing.title.popular-summary')}
            </div>
            {popularSummaries.map((summary, index) => (
              <PopularSummaryCard
                key={'popular-summary' + index}
                summary={summary}
                showInfo={false}
              />
            ))}
          </div>
        </RightPanel>
      </div>
    </div>
  );
}

export default LandingV2;
