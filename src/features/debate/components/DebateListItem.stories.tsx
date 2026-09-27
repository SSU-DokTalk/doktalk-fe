import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { vars } from '@/design-system';
import type { Debate } from '@/shared/api/models';
import { DebateListItem, DebateListItemSkeleton } from './DebateListItem';
import { COVER_WIDTH } from '@/shared/components/FeedItem.css';

const hoursAgo = (hours: number) =>
  new Date(Date.now() - hours * 3_600_000).toISOString().replace('Z', '');

const base: Debate = {
  id: 1,
  user_id: 1,
  isbn: 9788936434120,
  title: '채식주의자로 읽는 거부와 존재',
  content:
    '영혜는 왜 먹기를 거부했을까요? 1부를 중심으로 거부라는 행동이 어떻게 한 사람의 존재 선언이 되는지 이야기합니다.',
  location: null,
  link: 'https://meet.google.com/xyz-abcd-efg',
  is_online: true,
  held_at: '2026-10-06T10:30:00',
  price: 10000,
  limit: 12,
  participants_num: 3,
  is_full: false,
  category: (1 << 1) | (1 << 5),
  likes_num: 42,
  comments_num: 12,
  created: hoursAgo(50),
  updated: hoursAgo(50),
  user: { id: 1, name: '김지현', role: 'USER', is_deleted: false },
  book: {
    isbn: 9788936434120,
    title: '채식주의자',
    author: '한강',
    in_library_num: 0,
  },
};

const debates: Record<string, Debate> = {
  online: base,
  offlineFree: {
    ...base,
    id: 2,
    title: '넛지로 보는 선택의 설계',
    content:
      '기본값 하나가 선택을 어떻게 바꾸는지, 각자의 생활 속 넛지 사례를 가져와 이야기해요.',
    link: null,
    is_online: false,
    location: '서울 마포구 합정동',
    price: 0,
    limit: 8,
    category: 1 << 2,
    user: { ...base.user, name: '박서연' },
    book: { ...base.book, title: '넛지', author: '리처드 탈러' },
  },
  longMongolian: {
    ...base,
    id: 3,
    title:
      'Нэг ном уншсан хүмүүстэй уулзаж, хүн төрөлхтний түүхийн гурван хувьсгалын талаар ярилцъя',
    content: null,
    held_at: null,
    limit: 0,
    category: (1 << 3) | (1 << 4) | (1 << 2),
    user: { ...base.user, name: 'Батбаяр Энхтуяа' },
    book: { ...base.book, title: 'Sapiens', author: 'Yuval Noah Harari' },
  },
  full: {
    ...base,
    id: 4,
    limit: 6,
    participants_num: 5,
    is_full: true,
  },
};

type Args = { variant: keyof typeof debates; mobile: boolean };

function Preview({ variant, mobile }: Args) {
  return (
    <MemoryRouter>
      <div
        style={{
          maxWidth: 720,
          background: vars.color.surface,
          borderRadius: 20,
        }}
      >
        <DebateListItem
          debate={debates[variant]}
          coverWidth={mobile ? COVER_WIDTH.mobile : COVER_WIDTH.desktop}
        />
      </div>
    </MemoryRouter>
  );
}

const meta = {
  title: 'Features/Debate/DebateListItem',
  component: Preview,
  args: { variant: 'online', mobile: false },
  argTypes: {
    variant: { control: 'inline-radio', options: Object.keys(debates) },
  },
} satisfies Meta<typeof Preview>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 유료 · 온라인 */
export const Online: Story = {};

/** 무료 · 오프라인(장소 표시) */
export const OfflineFree: Story = { args: { variant: 'offlineFree' } };

/** 긴 몽골어 제목, 소개·일시·정원이 없을 때 */
export const LongMongolian: Story = {
  args: { variant: 'longMongolian' },
  globals: { locale: 'mn' },
};

/** 정원이 다 찼을 때: 인원 옆에 모집 마감 */
export const Full: Story = { args: { variant: 'full' } };

/** 모바일 배치 (표지가 오른쪽) */
export const Mobile: Story = {
  args: { mobile: true },
  globals: { viewport: { value: 'mobile', isRotated: false } },
};

/** 불러오는 중 */
export const Loading: Story = {
  render: ({ mobile }) => (
    <div
      role='status'
      aria-label='로딩 중...'
      style={{ maxWidth: 720, background: vars.color.surface }}
    >
      <DebateListItemSkeleton
        coverWidth={mobile ? COVER_WIDTH.mobile : COVER_WIDTH.desktop}
      />
    </div>
  ),
};
