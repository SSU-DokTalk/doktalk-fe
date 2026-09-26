import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRight, Plus, Trash2 } from 'lucide-react';
import { Button, buttonStyles } from '@/design-system';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: '결제하고 참여하기',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'neutral',
        'outline',
        'tonal',
        'ghost',
        'danger',
        'dangerGhost',
      ],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const row = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: 12,
} as const;

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <div style={row}>
        <Button variant='primary' startIcon={<Plus />}>
          토론방 생성
        </Button>
        <Button variant='secondary'>도서 요약 보기</Button>
        <Button variant='neutral'>프로필 편집</Button>
        <Button variant='outline'>팔로우</Button>
        <Button variant='tonal' endIcon={<ArrowRight />}>
          이어 읽기
        </Button>
        <Button variant='ghost'>전체 보기</Button>
      </div>
      <div style={row}>
        <Button variant='danger'>탈퇴하기</Button>
        <Button variant='dangerGhost' startIcon={<Trash2 />}>
          삭제
        </Button>
        <Button disabled>마감된 토론방</Button>
        <Button loading>결제를 확인하고 있어요</Button>
        <Button variant='secondary' loading>
          불러오는 중
        </Button>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={row}>
      <Button size='lg'>결제하고 참여하기 · 52</Button>
      <Button size='md'>토론방 생성 · 44</Button>
      <Button size='sm'>참여하기 · 36</Button>
    </div>
  ),
};

/** 링크는 `<a>`나 react-router `<Link>`에 buttonStyles()를 붙여요. */
export const AsLink: Story = {
  render: () => (
    <a href='#summary' className={buttonStyles({ variant: 'secondary' })}>
      도서 요약 보기
    </a>
  ),
};

export const FullWidth: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
  render: () => (
    <div style={{ width: 342, display: 'grid', gap: 8 }}>
      <Button size='lg' fullWidth>
        4,900원 결제하기
      </Button>
      <Button size='lg' variant='neutral' fullWidth>
        요약으로 돌아가기
      </Button>
    </div>
  ),
};
