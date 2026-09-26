import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, SegmentedControl } from '@/design-system';

const meta = {
  title: 'Components/SegmentedControl',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type Sort = 'latest' | 'popular' | 'date';

/** 흰 카드 위 정렬. 화살표 키로 옮겨 다닐 수 있어요. */
export const OnSurface: Story = {
  render: function Render() {
    const { t } = useTranslation();
    const [sort, setSort] = useState<Sort>('latest');
    return (
      <Card>
        <SegmentedControl<Sort>
          aria-label='정렬'
          value={sort}
          onValueChange={setSort}
          options={[
            { value: 'latest', label: t('page.search.sort.latest') },
            { value: 'popular', label: t('page.search.sort.popular') },
            { value: 'date', label: '날짜순' },
          ]}
        />
      </Card>
    );
  },
};

/** 회색 페이지 위에서는 한 단계 진한 바탕을 써요. */
export const OnCanvas: Story = {
  render: function Render() {
    const { t } = useTranslation();
    const [sort, setSort] = useState<Sort>('latest');
    return (
      <SegmentedControl<Sort>
        aria-label='정렬'
        on='canvas'
        size='sm'
        value={sort}
        onValueChange={setSort}
        options={[
          { value: 'latest', label: t('page.search.sort.latest') },
          { value: 'popular', label: t('page.search.sort.popular') },
        ]}
      />
    );
  },
};
