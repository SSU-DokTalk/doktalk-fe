import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Chip, ChipGroup } from '@/design-system';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  args: { children: '인문', pressed: false, size: 'md', selection: 'single' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    selection: { control: 'inline-radio', options: ['single', 'multi'] },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

const CATEGORIES = [
  '정치/사회',
  '인문',
  '경제/경영',
  '역사/문화',
  '과학(IT/기술)',
  '논술',
  '청소년',
  '어린이',
  '웹툰',
];

/** 하나만 고르는 필터. 선택하면 남색으로 채워져요. */
export const SingleSelectFilter: Story = {
  render: function Render() {
    const [selected, setSelected] = useState('전체');
    return (
      <ChipGroup aria-label='카테고리'>
        {['전체', ...CATEGORIES].map((label) => (
          <Chip
            key={label}
            size='sm'
            pressed={selected === label}
            onPressedChange={() => setSelected(label)}
          >
            {label}
          </Chip>
        ))}
      </ChipGroup>
    );
  },
};

/** 통합 검색의 결과 종류 칩. 개수를 함께 보여줘요. */
export const WithCount: Story = {
  render: function Render() {
    const [selected, setSelected] = useState('all');
    const items = [
      { key: 'all', label: '전체', count: 21 },
      { key: 'debate', label: '독서 토론', count: 3 },
      { key: 'summary', label: '도서 요약', count: 4 },
      { key: 'post', label: '게시글', count: 2 },
      { key: 'book', label: '도서', count: 12 },
    ];
    return (
      <ChipGroup aria-label='결과 종류'>
        {items.map((item) => (
          <Chip
            key={item.key}
            pressed={selected === item.key}
            onPressedChange={() => setSelected(item.key)}
            count={item.count}
          >
            {item.label}
          </Chip>
        ))}
      </ChipGroup>
    );
  },
};

/** 여러 개 고르는 선택. 툴바에서 몽골어로 바꿔 라벨 길이를 확인하세요. */
export const MultiSelectInterests: Story = {
  render: function Render() {
    const { t } = useTranslation();
    const keys = [
      'politics',
      'business',
      'religion',
      'webtoon',
      'philosophy',
      'exhibition',
      'self-development',
    ];
    const [picked, setPicked] = useState<string[]>(['business', 'philosophy']);
    return (
      <div style={{ maxWidth: 480 }}>
        <ChipGroup aria-label={t('page.register.form.interests')}>
          {keys.map((key) => (
            <Chip
              key={key}
              selection='multi'
              size='lg'
              pressed={picked.includes(key)}
              onPressedChange={(next) =>
                setPicked((prev) =>
                  next ? [...prev, key] : prev.filter((item) => item !== key)
                )
              }
            >
              {t(`page.register.interests.${key}`)}
            </Chip>
          ))}
        </ChipGroup>
      </div>
    );
  },
};

/** 모바일에서는 한 줄로 두고 옆으로 넘겨요. */
export const ScrollOnMobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
  render: function Render() {
    const [selected, setSelected] = useState('전체');
    return (
      <ChipGroup aria-label='카테고리' scroll>
        {['전체', ...CATEGORIES].map((label) => (
          <Chip
            key={label}
            pressed={selected === label}
            onPressedChange={() => setSelected(label)}
          >
            {label}
          </Chip>
        ))}
      </ChipGroup>
    );
  },
};
