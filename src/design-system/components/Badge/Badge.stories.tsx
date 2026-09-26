import type { Meta, StoryObj } from '@storybook/react-vite';
import { Check, Video } from 'lucide-react';
import { Badge } from '@/design-system';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: '무료', tone: 'info', size: 'sm', shape: 'rounded' },
  argTypes: {
    tone: {
      control: 'select',
      options: ['info', 'brand', 'solid', 'neutral', 'danger', 'overlay'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    shape: { control: 'inline-radio', options: ['rounded', 'pill'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <Badge>무료</Badge>
      <Badge shape='pill' size='lg'>
        경제/경영
      </Badge>
      <Badge
        tone='brand'
        shape='pill'
        size='md'
        icon={<Check strokeWidth={3} />}
      >
        구매 완료
      </Badge>
      <Badge tone='solid'>주최</Badge>
      <Badge tone='info'>참여</Badge>
      <Badge tone='neutral'>지난 모임</Badge>
      <Badge tone='danger'>결제 취소</Badge>
      <span style={{ padding: 12, background: '#E9E9E9', borderRadius: 12 }}>
        <Badge tone='overlay' shape='pill' size='md' icon={<Video />}>
          온라인
        </Badge>
      </span>
    </div>
  ),
};
