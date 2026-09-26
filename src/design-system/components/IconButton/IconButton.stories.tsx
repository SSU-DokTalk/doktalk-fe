import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ArrowUp,
  Bookmark,
  MessageCircleMore,
  MoreHorizontal,
  Search,
  Settings,
  Trash2,
} from 'lucide-react';
import { BookCover, IconButton } from '@/design-system';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  args: {
    'aria-label': '통합 검색',
    children: <Search />,
    variant: 'ghost',
    size: 'md',
    shape: 'circle',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['ghost', 'outline', 'solid', 'tonal', 'overlay'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
    shape: { control: 'inline-radio', options: ['circle', 'rounded'] },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <IconButton aria-label='통합 검색'>
        <Search />
      </IconButton>
      <IconButton aria-label='게시글 옵션' size='sm'>
        <MoreHorizontal />
      </IconButton>
      <IconButton aria-label='설정' variant='outline' shape='rounded'>
        <Settings />
      </IconButton>
      <IconButton
        aria-label='찜하기'
        variant='outline'
        size='lg'
        shape='rounded'
      >
        <Bookmark />
      </IconButton>
      <IconButton aria-label='메시지 보내기' variant='solid'>
        <ArrowUp />
      </IconButton>
      <BookCover title='넛지' author='리처드 탈러' width={96}>
        <IconButton
          aria-label='서재에서 삭제: 넛지'
          variant='overlay'
          style={{ position: 'absolute', top: 6, right: 6 }}
          size='sm'
        >
          <Trash2 />
        </IconButton>
      </BookCover>
      <IconButton aria-label='AI 챗봇 열기' variant='solid' size='xl' elevated>
        <MessageCircleMore />
      </IconButton>
    </div>
  ),
};
