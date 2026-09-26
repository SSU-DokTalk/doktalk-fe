import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Tabs, Text } from '@/design-system';

const meta = {
  title: 'Components/Tabs',
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const MY_TABS = ['post', 'summary', 'library', 'debate', 'payment'] as const;

/** 마이페이지 탭. 툴바에서 몽골어로 바꿔 탭 이름이 넘치는지 확인하세요. */
export const MyPage: Story = {
  render: function Render() {
    const { t } = useTranslation();
    const [tab, setTab] = useState<string>('debate');
    return (
      <Card padding='none' radius='xl' style={{ maxWidth: 880 }}>
        <Tabs.Root value={tab} onValueChange={(value) => setTab(String(value))}>
          <Tabs.List aria-label='마이페이지 메뉴' size='lg' divider>
            {MY_TABS.map((key) => (
              <Tabs.Tab key={key} value={key}>
                {t(`component.section.profile.tab.my-tab.${key}`)}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {MY_TABS.map((key) => (
            <Tabs.Panel key={key} value={key} style={{ padding: 24 }}>
              <Text tone='secondary'>
                {t(`component.section.profile.tab.my-tab.${key}`)} 내용
              </Text>
            </Tabs.Panel>
          ))}
        </Tabs.Root>
      </Card>
    );
  },
};

/** 모바일에서는 탭을 옆으로 넘겨 봐요. */
export const MyPageMobile: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
  render: function Render() {
    const { t } = useTranslation();
    const [tab, setTab] = useState<string>('debate');
    return (
      <div style={{ background: '#fff' }}>
        <Tabs.Root value={tab} onValueChange={(value) => setTab(String(value))}>
          <Tabs.List aria-label='마이페이지 메뉴' scroll divider>
            {MY_TABS.map((key) => (
              <Tabs.Tab key={key} value={key}>
                {t(`component.section.profile.tab.my-tab.${key}`)}
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.Root>
      </div>
    );
  },
};

/** 탭이 두세 개면 폭을 똑같이 나눠요. */
export const Filled: Story = {
  globals: { viewport: { value: 'mobile', isRotated: false } },
  render: function Render() {
    const { t } = useTranslation();
    const [tab, setTab] = useState<string>('library');
    return (
      <div style={{ background: '#fff' }}>
        <Tabs.Root value={tab} onValueChange={(value) => setTab(String(value))}>
          <Tabs.List aria-label='프로필 메뉴' fill divider>
            <Tabs.Tab value='post'>
              {t('component.section.profile.tab.user-tab.post')}
            </Tabs.Tab>
            <Tabs.Tab value='library'>
              {t('component.section.profile.tab.user-tab.library')}
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.Root>
      </div>
    );
  },
};

/** 회색 틀 안의 흰 알약. 모바일 내 서재에서 책과 요약을 나눠 봐요. */
export const Segmented: Story = {
  render: function Render() {
    const [tab, setTab] = useState<string>('books');
    return (
      <div style={{ maxWidth: 350 }}>
        <Tabs.Root value={tab} onValueChange={(value) => setTab(String(value))}>
          <Tabs.List aria-label='서재 구분' segmented>
            <Tabs.Tab value='books'>읽고 있는 책 24</Tabs.Tab>
            <Tabs.Tab value='summaries'>읽고 있는 요약 3</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value='books' style={{ padding: '16px 4px' }}>
            <Text tone='secondary'>책 그리드</Text>
          </Tabs.Panel>
          <Tabs.Panel value='summaries' style={{ padding: '16px 4px' }}>
            <Text tone='secondary'>요약 카드</Text>
          </Tabs.Panel>
        </Tabs.Root>
      </div>
    );
  },
};
