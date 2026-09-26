import type { Meta, StoryObj } from '@storybook/react-vite';
import { BookOpen, CircleAlert, RefreshCw, Trash2 } from 'lucide-react';
import {
  Avatar,
  Badge,
  BookCover,
  bookCoverStage,
  Button,
  Card,
  EmptyState,
  IconButton,
  Skeleton,
  Spinner,
  Text,
} from '@/design-system';

const meta = {
  title: 'Components/Display',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Avatars: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Avatar name='김지현' size={96} />
      <Avatar name='박서연' size={72} tone='steel' />
      <Avatar name='최민준' size={44} tone='gray' />
      <Avatar name='이준서' size={32} />
      <Avatar name='정하은' size={24} tone='steel' />
      <Avatar
        name='사진 없음'
        src='https://invalid.example/avatar.png'
        size={40}
        labelled
      />
    </div>
  ),
};

/**
 * 표지 이미지가 없거나 불러오지 못하면 제목 색 표지로 바뀌어요.
 * 마지막 표지는 일부러 잘못된 주소를 넣은 경우예요.
 */
export const BookCovers: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20 }}>
      <BookCover title='넛지: 파이널 에디션' author='리처드 탈러' width={108} />
      <BookCover title='채식주의자' author='한강' width={84} />
      <BookCover title='코스모스' author='칼 세이건' width={60} />
      <BookCover
        title='불러오지 못한 표지'
        src='https://invalid.example/cover.jpg'
        width={84}
      />
      <div className={bookCoverStage} style={{ width: 200, height: 200 }}>
        <BookCover title='총, 균, 쇠' author='재레드 다이아몬드' width={108} />
      </div>
      <BookCover title='데미안' author='헤르만 헤세' width={144}>
        <IconButton
          aria-label='서재에서 삭제: 데미안'
          variant='overlay'
          size='sm'
          style={{ position: 'absolute', top: 6, right: 6 }}
        >
          <Trash2 />
        </IconButton>
      </BookCover>
    </div>
  ),
};

/** width='fill'이면 그리드 칸을 채우고, 색 표지의 글자 크기도 칸 너비에 맞춰요. */
export const BookCoverGrid: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 12,
        maxWidth: 360,
      }}
    >
      <BookCover
        title='넛지: 파이널 에디션'
        author='리처드 탈러'
        width='fill'
      />
      <BookCover title='코스모스' author='칼 세이건' width='fill' />
      <BookCover title='총, 균, 쇠' author='재레드 다이아몬드' width='fill' />
    </div>
  ),
};

export const Cards: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 16,
        maxWidth: 960,
      }}
    >
      <Card as='article'>
        <Text as='h3' variant='title'>
          기본 카드
        </Text>
        <Text variant='bodyXs' tone='secondary'>
          padding md · radius lg (20px)
        </Text>
      </Card>
      <Card as='article' padding='lg' radius='xl'>
        <Text as='h3' variant='title'>
          패널 카드
        </Text>
        <Text variant='bodyXs' tone='secondary'>
          padding lg · radius xl (24px)
        </Text>
      </Card>
      <Card as='article' bordered radius='md'>
        <div style={{ display: 'flex', gap: 12 }}>
          <BookCover title='넛지' author='리처드 탈러' width={60} />
          <div style={{ display: 'grid', gap: 4, alignContent: 'start' }}>
            <Text variant='title' lines={2}>
              넛지로 보는 선택의 설계
            </Text>
            <Text variant='caption' tone='tertiary'>
              10.08 (목) · 합정동
            </Text>
            <Badge>무료</Badge>
          </div>
        </div>
      </Card>
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 16,
        maxWidth: 760,
      }}
    >
      <Card radius='xl'>
        <EmptyState
          icon={<BookOpen />}
          title='읽고 있는 책이 없어요'
          description='관심 있는 책을 검색해서 서재에 담아 보세요.'
          actions={<Button>도서 검색하기</Button>}
        />
      </Card>
      <Card radius='xl'>
        <EmptyState
          tone='danger'
          icon={<CircleAlert />}
          title='목록을 불러오지 못했어요'
          description='잠시 후 다시 시도해 주세요.'
          actions={
            <Button variant='neutral' startIcon={<RefreshCw />}>
              다시 시도
            </Button>
          }
        />
      </Card>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 16,
        maxWidth: 760,
      }}
    >
      <Card radius='xl' role='status' aria-label='목록을 불러오는 중'>
        {[62, 70, 54].map((width) => (
          <div
            key={width}
            style={{ display: 'flex', gap: 14, marginBottom: 18 }}
          >
            <Skeleton width={56} height={82} radius={4} />
            <div
              style={{
                flex: 1,
                display: 'grid',
                gap: 10,
                alignContent: 'start',
                paddingTop: 4,
              }}
            >
              <Skeleton width='86%' height={14} />
              <Skeleton width={`${width}%`} />
              <Skeleton width='40%' />
            </div>
          </div>
        ))}
      </Card>
      <Card
        radius='xl'
        style={{ display: 'grid', gap: 16, alignContent: 'start' }}
      >
        <Spinner label='로딩 중...' showLabel />
        <Spinner
          size='lg'
          label='카카오 계정으로 로그인하는 중이에요'
          showLabel
        />
      </Card>
    </div>
  ),
};
