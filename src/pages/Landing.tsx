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
import { DUMMY_DEBATES, DUMMY_SUMMARIES } from '@/common/dummy_data';
import Carousel from '@/components/carousel/Carousel';
import CarouselDebateCard from '@/components/card/CarouselDebateCard';
import { isMd } from '@/functions/breakpoint';
import CarouselSummaryCard from '@/components/card/CarouselSummaryCard';

function Landing() {
  const [recommendDebates, ..._] = useState<DebateType[]>(DUMMY_DEBATES);
  const [recommendSummaries, ...__] = useState<SummaryType[]>(DUMMY_SUMMARIES);

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
      <div className='recommendation-section'>
        <div className='recommended-debates md:pl-24! pr-12 mb-8'>
          <div className='recommend-content-container md:my-9!'>
            <div className='recommend-content-title ml-6!'>
              {t('page.debate.title.recommend')}
            </div>
            <Carousel size={3} className='recommend-content mx-auto! md:m-0!'>
              {recommendDebates.map((debate, idx) => (
                <CarouselDebateCard
                  key={'recommend-debate' + idx}
                  debate={debate}
                />
              ))}
            </Carousel>
          </div>
        </div>

        <div className='popular-content-container md:my-9!'>
          <div className='popular-content-title ml-6!'>
            {t('page.summary.title.recommend')}
          </div>
          <Carousel size={3}>
            {recommendSummaries.map((summary, index) => (
              <CarouselSummaryCard
                key={'popular-summary' + index}
                summary={summary}
              />
            ))}
          </Carousel>
        </div>
      </div>

      <div className='flex flex-row md:pl-24! pr-12'>
        <div className='container mx-auto px-4 py-8'>
          <h1 className='text-3xl! font-bold! text-brand1 mb-6!'>
            {t('page.landing.title.post')}
          </h1>
          {posts.length === 0 ? (
            <p className='text-gray-600'>
              {t('page.landing.item.no-post-item')}
            </p>
          ) : (
            <div className=''>
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
      </div>
    </div>
  );
}

export default Landing;
