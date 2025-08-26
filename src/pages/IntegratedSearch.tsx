import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Import card components
import DebateCard from '@/components/card/DebateCard';
import SummaryCard from '@/components/card/SummaryCard';
import PostCard from '@/components/card/PostCard';
import BookCard from '@/components/card/BookCard';

// Import types
import { DebateType, SummaryType, PostType, BookType } from '@/types/data';

// Dummy data for UI preview
const DUMMY_DEBATES: DebateType[] = [
  {
    id: 1,
    user_id: 1,
    isbn: 9788937460234,
    title: '인공지능의 미래에 대한 토론',
    content: '인공지능이 인간의 일자리를 대체할 것인가?',
    created: new Date(),
    updated: new Date(),
    likes_num: 24,
    comments_num: 8,
    held_at: new Date(),
    category: 1,
    limit: 50,
    price: 0,
    user: {
      id: 1,
      name: '김토론',
      profile: '/images/profile.svg',
      is_deleted: false,
      role: 'USER',
    },
    book: {
      isbn: 9788937460234,
      title: 'AI의 미래',
      image: '/images/book-ai.jpg',
      author: '미래학자',
      publisher: '미래출판사',
      pubdate: '2024',
      in_library_num: 156,
    },
  },
  {
    id: 2,
    user_id: 2,
    isbn: 9788937460890,
    title: '환경보호와 경제발전의 균형',
    content: '지속가능한 발전이 가능한가?',
    created: new Date(),
    updated: new Date(),
    likes_num: 18,
    comments_num: 12,
    held_at: new Date(),
    category: 2,
    limit: 30,
    price: 0,
    user: {
      id: 2,
      name: '이환경',
      profile: '/images/profile.svg',
      is_deleted: false,
      role: 'USER',
    },
    book: {
      isbn: 9788937460890,
      title: '지속가능한 미래',
      image: '/images/book-env.jpg',
      author: '환경학자',
      publisher: '환경출판사',
      pubdate: '2024',
      in_library_num: 203,
    },
  },
];

const DUMMY_SUMMARIES: SummaryType[] = [
  {
    id: 1,
    user_id: 1,
    isbn: 9788937460234,
    title: '사피엔스 요약',
    free_content: '인류의 역사를 세 가지 혁명으로 설명한 놀라운 책',
    charged_content: '더 자세한 내용은...',
    created: new Date(),
    updated: new Date(),
    likes_num: 45,
    comments_num: 15,
    category: 1,
    price: 1000,
    user: {
      id: 1,
      name: '김요약',
      profile: '/images/profile.svg',
      is_deleted: false,
      role: 'USER',
    },
    book: {
      isbn: 9788937460234,
      title: '사피엔스',
      image: '/images/book-sapiens.jpg',
      author: '유발 하라리',
      publisher: '김영사',
      pubdate: '2015',
      in_library_num: 234,
    },
  },
  {
    id: 2,
    user_id: 2,
    isbn: 9788937460890,
    title: '아토믹 해빗 핵심 정리',
    free_content: '1%의 작은 변화가 만드는 놀라운 결과',
    charged_content: '더 자세한 내용은...',
    created: new Date(),
    updated: new Date(),
    likes_num: 32,
    comments_num: 9,
    category: 2,
    price: 800,
    user: {
      id: 2,
      name: '박습관',
      profile: '/images/profile.svg',
      is_deleted: false,
      role: 'USER',
    },
    book: {
      isbn: 9788937460890,
      title: '아토믹 해빗',
      image: '/images/book-atomic.jpg',
      author: '제임스 클리어',
      publisher: '비즈니스북스',
      pubdate: '2019',
      in_library_num: 189,
    },
  },
];

const DUMMY_POSTS: PostType[] = [
  {
    id: 1,
    title: '독서의 중요성에 대해',
    content: '독서는 우리의 사고를 확장시키고 새로운 관점을 제공합니다.',
    created: new Date(),
    updated: new Date(),
    likes_num: 28,
    comments_num: 6,
    user_id: 1,
    user: {
      id: 1,
      name: '독서왕',
      profile: '/images/profile.svg',
      is_deleted: false,
      role: 'USER',
    },
    files: [],
  },
  {
    id: 2,
    title: '추천하고 싶은 책 리스트',
    content: '올해 읽은 책 중에서 정말 좋았던 책들을 소개합니다.',
    created: new Date(),
    updated: new Date(),
    likes_num: 42,
    comments_num: 18,
    user_id: 2,
    user: {
      id: 2,
      name: '책벌레',
      profile: '/images/profile.svg',
      is_deleted: false,
      role: 'USER',
    },
    files: [],
  },
];

const DUMMY_BOOKS: BookType[] = [
  {
    isbn: 9788937460234,
    title: '데미안',
    author: '헤르만 헤세',
    publisher: '민음사',
    pubdate: '2018',
    image: '/images/book-demian.jpg',
    description: '성장 소설의 고전',
    in_library_num: 156,
  },
  {
    isbn: 9788937460890,
    title: '1984',
    author: '조지 오웰',
    publisher: '민음사',
    pubdate: '2017',
    image: '/images/book-1984.jpg',
    description: '디스토피아 소설의 걸작',
    in_library_num: 203,
  },
];

function IntegratedSearch() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const { t } = useTranslation();

  // State for liked items
  const [likedDebates, setLikedDebates] = useState<number[]>([]);
  const [likedSummaries, setLikedSummaries] = useState<number[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [booksInLibrary, setBooksInLibrary] = useState<number[]>([]);

  // Results state (will be replaced with API calls later)
  const [debates] = useState<DebateType[]>(DUMMY_DEBATES.concat(DUMMY_DEBATES));
  const [summaries] = useState<SummaryType[]>(
    DUMMY_SUMMARIES.concat(DUMMY_SUMMARIES)
  );
  const [posts] = useState<PostType[]>(DUMMY_POSTS.concat(DUMMY_POSTS));
  const [books] = useState<BookType[]>(DUMMY_BOOKS.concat(DUMMY_BOOKS));

  return (
    <div className='integrated-search-page container !mx-auto !px-4 !py-8'>
      {/* Search Header */}
      <div className='search-header !mb-8'>
        <h1 className='!text-3xl !font-bold !text-brand1 !mb-2'>
          {t('page.integrated-search.title')}
        </h1>
        {searchQuery && (
          <p className='!text-lg !text-gray-600'>
            "<span className='!font-semibold !text-brand1'>{searchQuery}</span>"
            {t('page.integrated-search.search-result')}
          </p>
        )}
      </div>

      {/* 독서토론 섹션 */}
      <section className='search-section !mb-12'>
        <div className='section-header !mb-6'>
          <h2 className='!text-2xl !font-bold !text-gray-800 !mb-2'>
            {t('page.integrated-search.sections.debate')}
          </h2>
          <div className='!w-full !h-px !bg-gray-200'></div>
        </div>
        <div className='results-container'>
          {debates.length > 0 ? (
            <div className='!flex !gap-6 !overflow-x-auto !pb-4 !scrollbar-thin !scrollbar-thumb-gray-300 !scrollbar-track-gray-100'>
              {debates.map((debate) => (
                <div
                  key={debate.id}
                  className='result-card !flex-shrink-0 !w-80'
                >
                  <DebateCard
                    debate={debate}
                    hasLiked={likedDebates.includes(debate.id)}
                    setHasLiked={setLikedDebates}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className='no-results !text-center !py-8'>
              <p className='!text-gray-500'>
                {t('page.integrated-search.no-results')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 도서 요약 섹션 */}
      <section className='search-section !mb-12'>
        <div className='section-header !mb-6'>
          <h2 className='!text-2xl !font-bold !text-gray-800 !mb-2'>
            {t('page.integrated-search.sections.summary')}
          </h2>
          <div className='!w-full !h-px !bg-gray-200'></div>
        </div>
        <div className='results-container'>
          {summaries.length > 0 ? (
            <div className='!flex !gap-6 !overflow-x-auto !pb-4 !scrollbar-thin !scrollbar-thumb-gray-300 !scrollbar-track-gray-100'>
              {summaries.map((summary) => (
                <div
                  key={summary.id}
                  className='result-card !flex-shrink-0 !w-80'
                >
                  <SummaryCard
                    summary={summary}
                    hasLiked={likedSummaries.includes(summary.id)}
                    setHasLiked={setLikedSummaries}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className='no-results !text-center !py-8'>
              <p className='!text-gray-500'>
                {t('page.integrated-search.no-results')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 게시글 섹션 */}
      <section className='search-section !mb-12'>
        <div className='section-header !mb-6'>
          <h2 className='!text-2xl !font-bold !text-gray-800 !mb-2'>
            {t('page.integrated-search.sections.post')}
          </h2>
          <div className='!w-full !h-px !bg-gray-200'></div>
        </div>
        <div className='results-container'>
          {posts.length > 0 ? (
            <div className='!flex !gap-6 !overflow-x-auto !pb-4 !scrollbar-thin !scrollbar-thumb-gray-300 !scrollbar-track-gray-100'>
              {posts.map((post) => (
                <div key={post.id} className='result-card !flex-shrink-0 !w-80'>
                  <PostCard
                    post={post}
                    hasLiked={likedPosts.includes(post.id)}
                    setHasLiked={setLikedPosts}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className='no-results !text-center !py-8'>
              <p className='!text-gray-500'>
                {t('page.integrated-search.no-results')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 도서 검색 섹션 */}
      <section className='search-section !mb-12'>
        <div className='section-header !mb-6'>
          <h2 className='!text-2xl !font-bold !text-gray-800 !mb-2'>
            {t('page.integrated-search.sections.book')}
          </h2>
          <div className='!w-full !h-px !bg-gray-200'></div>
        </div>
        <div className='results-container'>
          {books.length > 0 ? (
            <div className='!flex !gap-6 !overflow-x-auto !pb-4 !scrollbar-thin !scrollbar-thumb-gray-300 !scrollbar-track-gray-100'>
              {books.map((book) => (
                <div
                  key={book.isbn}
                  className='result-card !flex-shrink-0 !w-96'
                >
                  <BookCard
                    book={book}
                    isInLibrary={booksInLibrary.includes(book.isbn)}
                    setIsInLibrary={setBooksInLibrary}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className='no-results !text-center !py-8'>
              <p className='!text-gray-500'>
                {t('page.integrated-search.no-results')}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default IntegratedSearch;
