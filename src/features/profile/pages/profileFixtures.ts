import type { QueryClient } from '@tanstack/react-query';
import { debateKeys } from '@/features/debate/api';
import { libraryKeys, type LibraryBook } from '@/features/library/api';
import { purchaseKeys } from '@/features/payment/api';
import { postKeys, type PostFeedPage } from '@/features/post/api';
import { summaryKeys } from '@/features/summary/api';
import { userKeys } from '@/features/user/api';
import type {
  Book,
  Debate,
  Page,
  Post,
  PublicUser,
  Purchase,
  Summary,
  User,
  UserBrief,
} from '@/shared/api/models';

/** 스토리 전용 예시 데이터. 서버 시각처럼 시간대 없는 UTC 문자열로 만들어요. */
export const VIEWER_ID = 3;
export const OTHER_ID = 8;

const DAY = 86_400_000;
const at = (offsetMs: number, hour = 10, minute = 30) => {
  const date = new Date(Date.now() + offsetMs);
  date.setHours(hour, minute, 0, 0);
  return date.toISOString().replace('Z', '');
};

const brief = (id: number, name: string): UserBrief => ({
  id,
  name,
  role: 'USER',
  is_deleted: false,
});

export const me: User = {
  id: VIEWER_ID,
  email: 'reader@example.com',
  name: '김지현',
  introduction:
    '인문·사회 책을 주로 읽어요. 한 달에 두 번 합정에서 독서 모임을 열고 있어요.',
  follower_num: 128,
  following_num: 64,
  role: 'USER',
  created: at(-400 * DAY),
  updated: at(-2 * DAY),
  is_deleted: false,
};

/** 다른 사람 프로필: 서버가 공개 정보만 줘요 (이메일·수정일 없음). */
export const other: PublicUser = {
  id: OTHER_ID,
  name: '박서연',
  introduction:
    '합정에서 경제·경영 책 모임을 열어요. 요즘은 행동경제학 책을 읽고 있어요.',
  follower_num: 342,
  following_num: 120,
  role: 'USER',
  created: at(-400 * DAY),
  is_deleted: false,
};

const book = (isbn: number, title: string, author: string): Book => ({
  isbn,
  title,
  author,
  in_library_num: 3,
});

const BOOKS = [
  book(9788901000001, '넛지: 파이널 에디션', '리처드 탈러^캐스 선스타인'),
  book(9788901000002, '채식주의자', '한강'),
  book(9788901000003, '코스모스', '칼 세이건'),
  book(9788901000004, '총, 균, 쇠', '재레드 다이아몬드'),
  book(9788901000005, '이기적 유전자', '리처드 도킨스'),
  book(9788901000006, '사피엔스', '유발 하라리'),
  book(9788901000007, '생각에 관한 생각', '대니얼 카너먼'),
  book(9788901000008, '소년이 온다', '한강'),
];

const debate = (
  id: number,
  hostId: number,
  title: string,
  heldAt: string,
  extra: Partial<Debate>,
  bookIndex: number
): Debate => ({
  id,
  user_id: hostId,
  isbn: BOOKS[bookIndex].isbn,
  title,
  held_at: heldAt,
  price: 0,
  limit: 8,
  participants_num: 3,
  is_full: false,
  category: 1,
  likes_num: 4,
  comments_num: 2,
  created: at(-30 * DAY),
  updated: at(-30 * DAY),
  user:
    hostId === VIEWER_ID ? brief(VIEWER_ID, me.name!) : brief(hostId, '박서연'),
  book: BOOKS[bookIndex],
  ...extra,
  is_online: Boolean(extra.link),
});

/** 내가 연 토론방 */
export const hostedDebates: Debate[] = [
  debate(
    101,
    VIEWER_ID,
    '채식주의자로 읽는 거부와 존재',
    at(10 * DAY, 19, 30),
    { link: 'https://meet.example.com/abc', price: 10000, limit: 12 },
    1
  ),
  debate(
    102,
    VIEWER_ID,
    '총, 균, 쇠 — 문명의 격차는 어디서 왔나',
    at(-28 * DAY, 14, 0),
    { location: '상도동' },
    3
  ),
];

/** 참여한 토론방 (구매 기록으로 찾아요) */
export const joinedDebates: Debate[] = [
  debate(
    201,
    OTHER_ID,
    '넛지로 보는 선택의 설계',
    at(12 * DAY, 20, 0),
    { location: '합정동' },
    0
  ),
  debate(
    202,
    OTHER_ID,
    '코스모스 함께 완독하기',
    at(-14 * DAY, 20, 0),
    { link: 'https://meet.example.com/xyz' },
    2
  ),
];

const summary = (id: number, title: string, bookIndex: number): Summary => ({
  id,
  user_id: OTHER_ID,
  isbn: BOOKS[bookIndex].isbn,
  title,
  free_content: '핵심을 장별로 정리했어요.',
  price: 3000,
  category: 1,
  likes_num: 12,
  comments_num: 1,
  created: at(-20 * DAY),
  updated: at(-20 * DAY),
  user: brief(OTHER_ID, '박서연'),
  book: BOOKS[bookIndex],
});

export const purchasedSummaries: Summary[] = [
  summary(301, '선택을 설계하는 법: 넛지 핵심 정리', 0),
  summary(302, '코스모스 장별 요약', 2),
  summary(303, '생각에 관한 생각 1~2부 요약', 6),
];

export const mySummaries: Summary[] = [
  {
    ...summary(311, '사피엔스를 세 문장으로', 5),
    user_id: VIEWER_ID,
    user: brief(VIEWER_ID, me.name!),
    price: 0,
  },
  {
    ...summary(312, '이기적 유전자, 오해와 진실', 4),
    user_id: VIEWER_ID,
    user: brief(VIEWER_ID, me.name!),
  },
];

const purchase = (
  id: number,
  type: 'D' | 'S',
  productId: number,
  content: string,
  price: number,
  created: string,
  cancelled = false
): Purchase => ({
  id,
  user_id: VIEWER_ID,
  product_type: type,
  product_id: productId,
  content,
  price,
  quantity: 1,
  created,
  updated: created,
  is_deleted: cancelled,
  deleted_at: cancelled ? created : null,
});

/** 이번 달 결제 (취소 1건 포함) */
export const monthPurchases: Purchase[] = [
  purchase(1, 'D', 201, '넛지로 보는 선택의 설계', 10000, at(-1 * DAY, 21, 14)),
  purchase(2, 'S', 301, '넛지: 파이널 에디션 요약', 3000, at(-2 * DAY, 8, 42)),
  purchase(
    3,
    'D',
    203,
    '총, 균, 쇠 — 문명의 격차는 어디서 왔나',
    5000,
    at(-3 * DAY, 13, 5),
    true
  ),
  purchase(4, 'S', 302, '코스모스 요약', 3000, at(-4 * DAY, 22, 30)),
];

export const purchaseHistory: Purchase[] = [
  ...monthPurchases.filter((item) => !item.is_deleted),
  purchase(5, 'D', 202, '코스모스 함께 완독하기', 0, at(-40 * DAY)),
  purchase(6, 'S', 303, '생각에 관한 생각 요약', 0, at(-45 * DAY)),
];

const posts: Post[] = [
  {
    id: 41,
    user_id: VIEWER_ID,
    title: '이번 달 모임 책 투표 결과',
    content:
      '후보였던 세 권 중에 넛지 파이널 에디션이 가장 많은 표를 받았어요. 다음 달에는 노이즈를 이어서 읽어 보려고 해요.',
    files: [],
    likes_num: 17,
    comments_num: 9,
    created: at(-4 * DAY),
    updated: at(-4 * DAY),
    user: brief(VIEWER_ID, me.name!),
  },
  {
    id: 42,
    user_id: VIEWER_ID,
    title: '생각에 관한 생각, 2부까지 읽고',
    content:
      '빠르게 생각하기와 느리게 생각하기를 나누는 설명이 생각보다 쉽게 읽혔어요.',
    files: [],
    likes_num: 25,
    comments_num: 4,
    created: at(-14 * DAY),
    updated: at(-14 * DAY),
    user: brief(VIEWER_ID, me.name!),
  },
];

const page = <T>(items: T[], total = items.length, size = 24): Page<T> => ({
  items,
  total,
  page: 1,
  size,
  pages: Math.max(1, Math.ceil(total / size)),
});

const infinite = <T>(first: T) => ({ pages: [first], pageParams: [1] });

export const libraryBooks: LibraryBook[] = BOOKS.map((item, index) => ({
  user_id: VIEWER_ID,
  isbn: item.isbn,
  created: at(-index * DAY),
  updated: at(-index * DAY),
  user: brief(VIEWER_ID, me.name!),
  book: item,
}));

const people: UserBrief[] = [
  brief(8, '박서연'),
  brief(11, '이준서'),
  brief(12, '최민준'),
  brief(13, '정하은'),
  brief(14, '한도윤'),
];

/** 프로필 화면이 쓰는 캐시를 모두 채워요. 요청이 나가지 않아요. */
export function seedProfile(client: QueryClient, viewerId: number) {
  const today = new Date();
  client.setQueryData(userKeys.me(VIEWER_ID), me);
  client.setQueryData(userKeys.detail(OTHER_ID), other);

  for (const userId of [VIEWER_ID, OTHER_ID]) {
    const feed: PostFeedPage = {
      ...page(
        posts.map((post) =>
          userId === VIEWER_ID
            ? post
            : { ...post, user_id: OTHER_ID, user: brief(OTHER_ID, '박서연') }
        ),
        posts.length,
        10
      ),
      likedIds: [42],
    };
    client.setQueryData(postKeys.userFeed(userId, viewerId), infinite(feed));
    client.setQueryData(
      libraryKeys.books(userId),
      infinite(
        page(
          userId === VIEWER_ID ? libraryBooks : libraryBooks.slice(0, 5),
          userId === VIEWER_ID ? 30 : 5
        )
      )
    );
  }

  client.setQueryData(
    summaryKeys.byUser(VIEWER_ID),
    infinite(page(mySummaries, mySummaries.length, 10))
  );
  client.setQueryData(debateKeys.hosted(VIEWER_ID), hostedDebates);
  for (const item of joinedDebates) {
    client.setQueryData(debateKeys.detail(item.id), item);
  }
  for (const item of purchasedSummaries) {
    client.setQueryData(summaryKeys.detail(item.id, 'kr'), item);
  }
  client.setQueryData(purchaseKeys.history(VIEWER_ID), purchaseHistory);
  client.setQueryData(
    purchaseKeys.month(VIEWER_ID, today.getFullYear(), today.getMonth()),
    monthPurchases
  );

  client.setQueryData(
    userKeys.follows(VIEWER_ID, 'followers'),
    infinite(page(people, people.length, 20))
  );
  client.setQueryData(
    userKeys.follows(VIEWER_ID, 'followings'),
    infinite(page(people.slice(0, 3), 3, 20))
  );
  people.forEach((person, index) =>
    client.setQueryData(
      userKeys.following(person.id, VIEWER_ID),
      index % 2 === 0
    )
  );
  client.setQueryData(userKeys.following(OTHER_ID, VIEWER_ID), false);
}
