import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  fontSize,
  fontWeight,
  layout,
  space,
  Text,
  typeScale,
  vars,
  type TypeVariant,
} from '@/design-system';

const meta = {
  title: 'Foundations/Tokens',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const swatches: { name: string; token: string; value: string; use: string }[] =
  [
    {
      name: 'Brand (Navy)',
      token: 'color-brand',
      value: vars.color.brand,
      use: '주요 버튼·활성 상태',
    },
    {
      name: 'Brand hover',
      token: 'color-brand-hover',
      value: vars.color.brandHover,
      use: '주요 버튼 hover',
    },
    {
      name: 'Brand subtle',
      token: 'color-brand-subtle',
      value: vars.color.brandSubtle,
      use: '활성 메뉴·날짜 블록',
    },
    {
      name: 'Brand muted',
      token: 'color-brand-muted',
      value: vars.color.brandMuted,
      use: '아바타·선택 칩',
    },
    {
      name: 'Info',
      token: 'color-info',
      value: vars.color.info,
      use: '카테고리·보조 강조 텍스트',
    },
    {
      name: 'Info icon (Steel)',
      token: 'color-info-icon',
      value: vars.color.infoIcon,
      use: '아이콘 전용, 텍스트 금지',
    },
    {
      name: 'Info subtle',
      token: 'color-info-subtle',
      value: vars.color.infoSubtle,
      use: '무료·카테고리 배지',
    },
    {
      name: 'Text',
      token: 'color-text',
      value: vars.color.text,
      use: '제목·기본 텍스트',
    },
    {
      name: 'Text secondary',
      token: 'color-text-secondary',
      value: vars.color.textSecondary,
      use: '보조 본문',
    },
    {
      name: 'Text tertiary',
      token: 'color-text-tertiary',
      value: vars.color.textTertiary,
      use: '메타·캡션',
    },
    {
      name: 'Danger',
      token: 'color-danger',
      value: vars.color.danger,
      use: '삭제·오류',
    },
    {
      name: 'Border',
      token: 'color-border',
      value: vars.color.border,
      use: '구분선·카드 테두리',
    },
    {
      name: 'Border input',
      token: 'color-border-input',
      value: vars.color.borderInput,
      use: '입력 테두리',
    },
    {
      name: 'Canvas',
      token: 'color-canvas',
      value: vars.color.canvas,
      use: '페이지 배경',
    },
    {
      name: 'Surface',
      token: 'color-surface',
      value: vars.color.surface,
      use: '카드·시트',
    },
    {
      name: 'Inverse',
      token: 'color-inverse',
      value: vars.color.inverse,
      use: '토스트·푸터',
    },
  ];

export const Colors: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 16,
        padding: 24,
      }}
    >
      {swatches.map((swatch) => (
        <div
          key={swatch.token}
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            background: vars.color.surface,
            boxShadow: vars.shadow.sm,
          }}
        >
          <div
            style={{
              height: 72,
              background: swatch.value,
              borderBottom: `1px solid ${vars.color.border}`,
            }}
          />
          <div style={{ padding: 12, display: 'grid', gap: 2 }}>
            <Text variant='bodySm' weight='bold'>
              {swatch.name}
            </Text>
            <Text variant='caption' tone='tertiary'>
              --dt-{swatch.token}
            </Text>
            <Text variant='caption' tone='secondary'>
              {swatch.use}
            </Text>
          </div>
        </div>
      ))}
    </div>
  ),
};

const samples: Record<TypeVariant, string> = {
  display: '함께 읽고, 함께 토론하며,',
  pageTitle: '독서 토론방',
  heading: '채식주의자로 읽는 거부와 존재',
  sectionTitle: '인기 요약',
  sectionTitleSm: '댓글 12',
  cardTitle: '넛지로 보는 선택의 설계',
  cardTitleSm: '생각에 관한 생각, 2부까지 읽고',
  body: '독서토론과 도서 요약을 통해 지식을 나누고 성장하는 플랫폼입니다.',
  bodySm: '같은 책을 읽은 사람들과 모임을 열고 이야기를 나눠요',
  label: '토론 인원',
  caption: '10월 6일 (화) 19:30 · 온라인 · 정원 12명',
  captionStrong: '인문 · 사회',
};

const px = (rem: string) => `${parseFloat(rem) * 16}px`;

export const Typography: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 20, padding: 24 }}>
      {(Object.keys(typeScale) as TypeVariant[]).map((variant) => {
        const spec = typeScale[variant];
        return (
          <div
            key={variant}
            style={{
              display: 'grid',
              gridTemplateColumns: '160px 1fr',
              gap: 16,
              alignItems: 'baseline',
            }}
          >
            <Text variant='caption' tone='tertiary'>
              {variant} · {px(spec.fontSize)} /{' '}
              {'fontWeight' in spec ? spec.fontWeight : '–'} / {spec.lineHeight}
            </Text>
            <Text variant={variant}>{samples[variant]}</Text>
          </div>
        );
      })}
      <div
        lang='mn'
        style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 16 }}
      >
        <Text variant='caption' tone='tertiary'>
          body · Монгол
        </Text>
        <Text variant='body'>
          Хамтдаа уншиж, хамтдаа хэлэлцэж, хамтдаа өсье.
        </Text>
      </div>
    </div>
  ),
};

function ScaleTable({
  title,
  rows,
}: {
  title: string;
  rows: [string, string, React.ReactNode?][];
}) {
  return (
    <section style={{ display: 'grid', gap: 8 }}>
      <Text as='h2' variant='sectionTitle'>
        {title}
      </Text>
      {rows.map(([name, value, sample]) => (
        <div
          key={name}
          style={{
            display: 'grid',
            gridTemplateColumns: '180px 90px 1fr',
            gap: 16,
            alignItems: 'center',
          }}
        >
          <Text variant='caption' tone='secondary'>
            {name}
          </Text>
          <Text variant='caption' tone='tertiary'>
            {value}
          </Text>
          {sample}
        </div>
      ))}
    </section>
  );
}

/** 간격·글자 크기·굵기·앱 틀 치수. 스타일 파일에서는 이 표에 있는 값만 써요. */
export const Scales: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 32, padding: 24, maxWidth: 720 }}>
      <ScaleTable
        title='space'
        rows={Object.entries(space).map(([key, value]) => [
          `space[${key}]`,
          value,
          <span
            key={key}
            style={{
              width: value,
              height: 12,
              borderRadius: 2,
              background: vars.color.brandMuted,
            }}
          />,
        ])}
      />
      <ScaleTable
        title='fontSize'
        rows={Object.entries(fontSize).map(([key, value]) => [
          `fontSize[${key}]`,
          value,
          <span key={key} style={{ fontSize: value, lineHeight: 1.3 }}>
            함께 읽고 Хамтдаа
          </span>,
        ])}
      />
      <ScaleTable
        title='fontWeight'
        rows={Object.entries(fontWeight).map(([key, value]) => [
          `fontWeight.${key}`,
          String(value),
          <span key={key} style={{ fontWeight: value }}>
            함께 읽고, 함께 토론하며
          </span>,
        ])}
      />
      <ScaleTable
        title='layout'
        rows={Object.entries(layout).map(([key, value]) => [
          `layout.${key}`,
          value,
        ])}
      />
    </div>
  ),
};
