import { Menu as BaseMenu } from '@base-ui/react/menu';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import * as s from './Menu.css';

type WithStringClassName<T> = Omit<T, 'className'> & { className?: string };

type PositionerProps = ComponentProps<typeof BaseMenu.Positioner>;

export type MenuContentProps = WithStringClassName<
  ComponentProps<typeof BaseMenu.Popup>
> & {
  side?: PositionerProps['side'];
  align?: PositionerProps['align'];
  sideOffset?: number;
};

/** 떠 있는 메뉴 판. Portal·Positioner·Popup을 한 번에 감싸요. */
export function MenuContent({
  side = 'bottom',
  align = 'end',
  sideOffset = 8,
  className,
  ...rest
}: MenuContentProps) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={s.positioner}
      >
        <BaseMenu.Popup {...rest} className={clsx(s.popup, className)} />
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

export function MenuItem({
  className,
  ...rest
}: WithStringClassName<ComponentProps<typeof BaseMenu.Item>>) {
  return <BaseMenu.Item {...rest} className={clsx(s.item, className)} />;
}

/**
 * 링크 메뉴 항목. react-router 링크는 `render={<Link to='/mypage' />}`로 넘겨요.
 */
export function MenuLinkItem({
  className,
  ...rest
}: WithStringClassName<ComponentProps<typeof BaseMenu.LinkItem>>) {
  return <BaseMenu.LinkItem {...rest} className={clsx(s.item, className)} />;
}

export function MenuRadioItem({
  className,
  children,
  ...rest
}: WithStringClassName<ComponentProps<typeof BaseMenu.RadioItem>> & {
  children: ReactNode;
}) {
  return (
    <BaseMenu.RadioItem {...rest} className={clsx(s.radioItem, className)}>
      {children}
      <BaseMenu.RadioItemIndicator className={s.indicator}>
        <Check strokeWidth={2.6} aria-hidden='true' />
      </BaseMenu.RadioItemIndicator>
    </BaseMenu.RadioItem>
  );
}

export function MenuSeparator() {
  return <BaseMenu.Separator className={s.separator} />;
}

export function MenuGroupLabel({
  className,
  ...rest
}: WithStringClassName<ComponentProps<typeof BaseMenu.GroupLabel>>) {
  return (
    <BaseMenu.GroupLabel {...rest} className={clsx(s.groupLabel, className)} />
  );
}
