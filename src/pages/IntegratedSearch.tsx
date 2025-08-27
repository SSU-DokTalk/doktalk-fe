import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

// Import card components
import DebateCard from '@/components/card/DebateCard';
import SummaryCard from '@/components/card/SummaryCard';
import PostCard from '@/components/card/PostCard';
import BookCard from '@/components/card/BookCard';

// Import types
import { DebateType, SummaryType, PostType, BookType } from '@/types/data';
import { useAppSelector } from '@/stores/hooks';
import { selectUser } from '@/stores/user';

function IntegratedSearch() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { t } = useTranslation();
  const user = useAppSelector(selectUser);

  // State for liked items
  const [likedDebates, setLikedDebates] = useState<number[]>([]);
  const [likedSummaries, setLikedSummaries] = useState<number[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [booksInLibrary, setBooksInLibrary] = useState<number[]>([]);

  // Results state
  const [debates, setDebates] = useState<DebateType[]>([]);
  const [summaries, setSummaries] = useState<SummaryType[]>([]);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [books, setBooks] = useState<BookType[]>([]);

  // Loading states
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch data when searchQuery changes
  useEffect(() => {
    if (searchQuery) {
      fetchAllData();
    }
  }, [searchQuery]);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchDebates(),
        fetchSummaries(),
        fetchPosts(),
        fetchBooks(),
      ]);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDebates = async () => {
    try {
      const response = await axios.get(
        `/api/debate?search=${searchQuery}&searchby=it&sortby=latest`
      );
      const debateItems = response.data.items || [];
      setDebates(debateItems);

      // Fetch likes if user is logged in
      if (user.id !== 0 && debateItems.length > 0) {
        try {
          const likesResponse = await axios.get(
            `/api/debates/like?${debateItems.map((item: DebateType) => 'ids=' + item.id).join('&')}`
          );
          setLikedDebates(likesResponse.data || []);
        } catch (error) {
          console.error('Error fetching debate likes:', error);
          setLikedDebates([]);
        }
      }
    } catch (error) {
      console.error('Error fetching debates:', error);
      setDebates([]);
    }
  };

  const fetchSummaries = async () => {
    try {
      const response = await axios.get(
        `/api/summary?search=${searchQuery}&searchby=it&sortby=latest`
      );
      const summaryItems = response.data.items || [];
      setSummaries(summaryItems);

      // Fetch likes if user is logged in
      if (user.id !== 0 && summaryItems.length > 0) {
        try {
          const likesResponse = await axios.get(
            `/api/summarys/like?${summaryItems.map((item: SummaryType) => 'ids=' + item.id).join('&')}`
          );
          setLikedSummaries(likesResponse.data || []);
        } catch (error) {
          console.error('Error fetching summary likes:', error);
          setLikedSummaries([]);
        }
      }
    } catch (error) {
      console.error('Error fetching summaries:', error);
      setSummaries([]);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`/api/post?search=${searchQuery}`);
      const postItems = response.data.items || [];
      setPosts(postItems);

      // Fetch likes if user is logged in
      if (user.id !== 0 && postItems.length > 0) {
        try {
          const likesResponse = await axios.get(
            `/api/posts/like?${postItems.map((item: PostType) => 'ids=' + item.id).join('&')}`
          );
          setLikedPosts(likesResponse.data || []);
        } catch (error) {
          console.error('Error fetching post likes:', error);
          setLikedPosts([]);
        }
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        `/api/books?search=${searchQuery}&sortby=latest&api_provider=naver`
      );
      const bookItems = response.data.items || [];
      setBooks(bookItems);

      // Fetch library status if user is logged in
      if (user.id !== 0 && bookItems.length > 0) {
        try {
          const libraryResponse = await axios.get(
            `/api/books/library?${bookItems.map((item: BookType) => 'isbns=' + item.isbn).join('&')}`
          );
          setBooksInLibrary(libraryResponse.data || []);
        } catch (error) {
          console.error('Error fetching book library status:', error);
          setBooksInLibrary([]);
        }
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setBooks([]);
    }
  };

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
          {isLoading ? (
            <div className='loading !text-center !py-8'>
              <p className='!text-gray-500'>{t('common.loading')}</p>
            </div>
          ) : debates.length > 0 ? (
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
          {isLoading ? (
            <div className='loading !text-center !py-8'>
              <p className='!text-gray-500'>{t('common.loading')}</p>
            </div>
          ) : summaries.length > 0 ? (
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
          {isLoading ? (
            <div className='loading !text-center !py-8'>
              <p className='!text-gray-500'>{t('common.loading')}</p>
            </div>
          ) : posts.length > 0 ? (
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
          {isLoading ? (
            <div className='loading !text-center !py-8'>
              <p className='!text-gray-500'>{t('common.loading')}</p>
            </div>
          ) : books.length > 0 ? (
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
