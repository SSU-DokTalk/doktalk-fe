import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Select from './Select';

const meta = {
  title: 'Components/Select',
  component: Select,
  args: {
    label: '검색 기준',
    size: 'sm',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    variant: { control: 'inline-radio', options: ['outlined', 'filled'] },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

function Controlled(args: Story['args']) {
  const [value, setValue] = useState('bt');
  return (
    <div style={{ width: 200 }}>
      <Select
        {...args}
        label={args?.label ?? '검색 기준'}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      >
        <option value='bt'>도서 제목</option>
        <option value='it'>토론방 제목</option>
      </Select>
    </div>
  );
}

/** 목록 검색창 옆의 검색 기준 */
export const Default: Story = {
  render: (args) => <Controlled {...args} />,
};

/** 라벨을 숨기면 스크린 리더만 읽어요. */
export const HiddenLabel: Story = {
  args: { hideLabel: true },
  render: (args) => <Controlled {...args} />,
};

export const WithError: Story = {
  args: { error: '검색 기준을 골라주세요' },
  render: (args) => <Controlled {...args} />,
};
