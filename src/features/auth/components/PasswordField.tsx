import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, TextField, type TextFieldProps } from '@/design-system';

/**
 * 비밀번호 입력칸. 오른쪽 버튼으로 입력한 글자를 보이거나 가려요.
 * 버튼 이름은 그대로 두고 눌림 상태(aria-pressed)로 알려요.
 */
export const PasswordField = forwardRef<
  HTMLInputElement,
  Omit<TextFieldProps, 'type' | 'endSlot'>
>(function PasswordField(props, ref) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      {...props}
      ref={ref}
      type={visible ? 'text' : 'password'}
      autoCapitalize='off'
      spellCheck={false}
      endSlot={
        <IconButton
          variant='ghost'
          size='md'
          aria-label={t('page.auth.field.show-password')}
          aria-pressed={visible}
          onClick={() => setVisible((value) => !value)}
        >
          {visible ? <EyeOff /> : <Eye />}
        </IconButton>
      }
    />
  );
});
