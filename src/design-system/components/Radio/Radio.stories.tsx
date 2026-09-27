import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Radio, vars } from '@/design-system';

const meta = {
  title: 'Components/Radio',
  component: Radio,
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

const OPTIONS = [
  { value: 'mn', label: 'Монгол хэл', lang: 'mn' },
  { value: 'kr', label: '한국어', lang: 'ko' },
  { value: 'us', label: 'English', lang: 'en' },
];

/** 줄 전체가 라벨이라 어디를 눌러도 골라져요. */
export const List: Story = {
  render: function Render() {
    const [value, setValue] = useState('kr');
    return (
      <fieldset
        style={{
          display: 'grid',
          maxWidth: 320,
          margin: 0,
          padding: 0,
          border: 0,
        }}
      >
        <legend style={{ color: vars.color.textSecondary }}>화면 언어</legend>
        {OPTIONS.map((option) => (
          <label
            key={option.value}
            lang={option.lang}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              minHeight: 44,
              cursor: 'pointer',
            }}
          >
            {option.label}
            <Radio
              name='language'
              value={option.value}
              checked={value === option.value}
              onChange={() => setValue(option.value)}
            />
          </label>
        ))}
      </fieldset>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <Radio disabled defaultChecked />
      고를 수 없음
    </label>
  ),
};
