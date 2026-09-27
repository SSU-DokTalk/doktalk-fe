import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { RouteBoundary, RouteError, RouteLoading } from './RouteBoundary';

function Broken(): never {
  throw new Error('화면 오류 예시');
}

const meta = {
  title: 'Shell/RouteBoundary',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** 페이지 조각을 받는 동안 본문 자리에 보여요 (0.3초 뒤에 나타나요). */
export const Loading: Story = {
  render: () => <RouteLoading />,
};

/** 페이지를 그리지 못했을 때. 셸은 그대로 두고 본문 자리에만 보여요. */
export const Failed: Story = {
  render: () => <RouteError />,
};

/** 셸 밖 화면(로그인·회원가입)에서는 화면 전체를 채워요. */
export const FullPageError: Story = {
  render: () => <RouteError fullPage />,
};

/** 페이지가 오류를 던지면 RouteBoundary가 받아서 오류 화면으로 바꿔요. */
export const CaughtRenderError: Story = {
  render: () => (
    <MemoryRouter>
      <RouteBoundary>
        <Broken />
      </RouteBoundary>
    </MemoryRouter>
  ),
};
