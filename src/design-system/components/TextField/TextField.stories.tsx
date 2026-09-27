import type { Meta, StoryObj } from '@storybook/react-vite';
import { Eye, EyeOff, Search, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, TextField, Textarea, vars } from '@/design-system';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  args: {
    label: '제목',
    placeholder: '제목을 입력해주세요',
    size: 'md',
    variant: 'outlined',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    variant: { control: 'inline-radio', options: ['outlined', 'filled'] },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420, display: 'grid', gap: 20 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <>
      <TextField
        label='온라인 링크'
        defaultValue='https://meet.google.com/xyz-abcd-efg'
        helperText='https://url 형식으로 적어주세요'
      />
      <TextField
        label='온라인 링크'
        defaultValue='meet.google.com'
        error='https://url 형식으로 적어주세요'
      />
      <TextField label='이메일' defaultValue='jihyun@example.com' disabled />
      <TextField
        label='닉네임'
        labelSuffix={
          <span
            style={{ fontSize: 12, fontWeight: 700, color: vars.color.brand }}
          >
            필수
          </span>
        }
        defaultValue='김지현'
      />
    </>
  ),
};

/** 로그인 폼. 툴바에서 몽골어로 바꾸면 라벨과 안내 문구 길이를 볼 수 있어요. */
export const LoginForm: Story = {
  render: function Render() {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);
    return (
      <>
        <TextField
          size='lg'
          type='email'
          autoComplete='email'
          label={t('page.login.email')}
          placeholder={t('page.login.email')}
        />
        <TextField
          size='lg'
          type={visible ? 'text' : 'password'}
          autoComplete='current-password'
          label={t('page.login.password')}
          placeholder={t('page.login.password')}
          endSlot={
            <IconButton
              aria-label={visible ? '비밀번호 숨기기' : '비밀번호 보기'}
              aria-pressed={visible}
              onClick={() => setVisible((prev) => !prev)}
            >
              {visible ? <EyeOff /> : <Eye />}
            </IconButton>
          }
        />
      </>
    );
  },
};

export const SearchField: Story = {
  render: function Render() {
    const [query, setQuery] = useState('넛지');
    return (
      <TextField
        label='통합 검색'
        hideLabel
        type='search'
        variant='filled'
        size='sm'
        placeholder='관심있는 도서를 검색하세요!'
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        startIcon={<Search aria-hidden='true' />}
        endSlot={
          query ? (
            <IconButton
              aria-label='검색어 지우기'
              size='sm'
              onClick={() => setQuery('')}
            >
              <X />
            </IconButton>
          ) : null
        }
      />
    );
  },
};

export const MultiLine: Story = {
  render: () => (
    <Textarea
      label='자기소개'
      placeholder='회원님에 대해 소개해주세요.'
      defaultValue='인문·사회 책을 주로 읽어요. 한 달에 두 번 합정에서 독서 모임을 열고 있어요.'
      helperText='프로필에 그대로 보여요'
    />
  ),
};
