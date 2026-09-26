import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import clsx from 'clsx';
import { X } from 'lucide-react';
import type {
  ComponentProps,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from 'react';
import IconButton from '../IconButton/IconButton';
import * as s from './Dialog.css';

export type DialogContentProps = Omit<
  ComponentProps<typeof BaseDialog.Popup>,
  'className'
> &
  s.DialogPopupVariants & {
    /** 가운데 모달의 최대 너비(px). 기본 520 */
    width?: number;
    className?: string;
  };

/**
 * 뒷배경과 함께 뜨는 창이에요. 포커스를 안에 가두고 Esc로 닫혀요.
 * placement로 가운데 모달, 아래 시트, 오른쪽 서랍을 골라요.
 */
export function DialogContent({
  placement,
  width,
  className,
  style,
  ...rest
}: DialogContentProps) {
  const widthStyle = width
    ? ({ '--dialog-width': `${width}px` } as CSSProperties)
    : undefined;

  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className={s.backdrop} />
      <BaseDialog.Popup
        {...rest}
        className={clsx(s.popup({ placement }), className)}
        style={{ ...widthStyle, ...(typeof style === 'object' ? style : {}) }}
      />
    </BaseDialog.Portal>
  );
}

export type DialogHeaderProps = {
  title: ReactNode;
  /** 닫기 버튼의 스크린 리더용 이름 (예: 닫기) */
  closeLabel: string;
  divider?: boolean;
  className?: string;
};

export function DialogHeader({
  title,
  closeLabel,
  divider = false,
  className,
}: DialogHeaderProps) {
  return (
    <div className={clsx(s.header, divider && s.headerDivider, className)}>
      <BaseDialog.Title className={s.title}>{title}</BaseDialog.Title>
      <BaseDialog.Close
        render={
          <IconButton aria-label={closeLabel}>
            <X />
          </IconButton>
        }
      />
    </div>
  );
}

export function DialogBody({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return <div {...rest} className={clsx(s.body, className)} />;
}

export function DialogFooter({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return <div {...rest} className={clsx(s.footer, className)} />;
}
