import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import Checkbox from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: { label: '무료로 열기' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledCheckbox(args: Story['args']) {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      {...args}
      label={args?.label ?? '무료로 열기'}
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
}

export const Default: Story = {
  render: (args) => <ControlledCheckbox {...args} />,
};

export const Disabled: Story = {
  args: { disabled: true, defaultChecked: true },
};
