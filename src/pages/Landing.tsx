import { useEffect, useState } from 'react';

import { PostType, SummaryType } from '@/types/data';
import { useAppSelector } from '@/stores/hooks';
import { selectUser } from '@/stores/user';
import PopularSummaryCard from '../components/card/PopularSummaryCard';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { MiddlePanel, RightPanel } from '@/components/panel/sidePanel';
import SimplePostCard from '@/components/card/SimplePostCard';
import { DebateType } from '@/types/data';
import { DUMMY_DEBATES } from '@/common/dummy_data';

function Landing() {
  const [debates, _] = useState<DebateType[]>(DUMMY_DEBATES);

  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [popularSummaries, setPopularSummaries] = useState<SummaryType[]>([]);
  const [isPopularSummaryLoaded, setIsPopularSummaryLoaded] =
    useState<boolean>(false);

  const { t } = useTranslation();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/post/recent?page=1&size=12');
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
        })
        .finally(() => {
          setIsPopularSummaryLoaded(true);
        });
    }
  });

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
    <div id='landing-page' className='flex flex-col'>
      <div
        id='landing-page-upper-container'
        className='pb-8! mb-8! md:pb-15! md:mb-15!'
      >
        <div className='container-title md:ml-8! md:px-24! px-4!'>
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

        <div className='container-contents-carousel flex items-end justify-items-center gap-4 overflow-x-auto w-full md:px-24! px-4!'>
          {debates.map((debate, idx) => (
            <SimplePostCard
              key={'recommend-debate' + idx}
              title={debate.title}
              content={debate.content}
              thumbnail={debate.book.image}
              navigateTo={`/debate/${debate.id}`}
              width='group w-44 hover:w-52 flex-shrink-0 transition-all duration-300 ease-in-out'
              objectFit='cover'
              imageHeight='h-64 group-hover:h-76 transition-all duration-300 ease-in-out'
            />
          ))}
        </div>
      </div>

      <div className='flex flex-row md:pl-24! pr-12'>
        <MiddlePanel className='post-container px-4! w-full'>
          <div className='container mx-auto px-4 py-8'>
            <h1 className='text-3xl! font-bold! text-brand1 mb-6!'>
              {t('page.landing.title.post')}
            </h1>
            {posts.length === 0 ? (
              <p className='text-gray-600'>
                {t('page.landing.item.no-post-item')}
              </p>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2'>
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

export default Landing;
