import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ArrowUp,
  Bookmark,
  Globe,
  MessageCircleMore,
  MoreHorizontal,
  Search,
  Settings,
  Trash2,
  X,
} from 'lucide-react';
import { BookCover, IconButton, vars } from '@/design-system';

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
      options: ['ghost', 'outline', 'solid', 'tonal', 'onBrand', 'overlay'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'fab'] },
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
      <IconButton aria-label='메시지 보내기' variant='solid' size='lg'>
        <ArrowUp />
      </IconButton>
      <IconButton aria-label='화면 언어: 한국어' shape='rounded' labelled>
        <Globe />
        한국어
      </IconButton>
      <span
        style={{
          display: 'inline-flex',
          padding: 8,
          borderRadius: 12,
          background: vars.color.brand,
        }}
      >
        <IconButton aria-label='챗봇 닫기' variant='onBrand'>
          <X />
        </IconButton>
      </span>
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
      <IconButton aria-label='AI 챗봇 열기' variant='solid' size='fab' elevated>
        <MessageCircleMore />
      </IconButton>
    </div>
  ),
};
