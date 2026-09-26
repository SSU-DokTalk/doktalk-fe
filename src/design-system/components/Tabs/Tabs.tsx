import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import clsx from 'clsx';
import { createContext, useContext, type ComponentProps } from 'react';
import * as s from './Tabs.css';

type Size = 'md' | 'lg';

const TabsStyleContext = createContext<{
  size: Size;
  fill: boolean;
  segmented: boolean;
}>({
  size: 'md',
  fill: false,
  segmented: false,
});

type RootProps = Omit<ComponentProps<typeof BaseTabs.Root>, 'className'> & {
  className?: string;
};

export function TabsRoot({ className, ...rest }: RootProps) {
  return <BaseTabs.Root {...rest} className={className} />;
}

type ListProps = Omit<ComponentProps<typeof BaseTabs.List>, 'className'> &
  s.TabsListVariants & {
    /** 탭 묶음 이름 (예: 마이페이지 메뉴) */
    'aria-label': string;
    size?: Size;
    className?: string;
  };

export function TabsList({
  size = 'md',
  fill = false,
  scroll,
  divider,
  segmented = false,
  className,
  children,
  ...rest
}: ListProps) {
  return (
    <TabsStyleContext.Provider
      value={{ size, fill: Boolean(fill), segmented: Boolean(segmented) }}
    >
      <BaseTabs.List
        {...rest}
        className={clsx(
          s.list({ fill, scroll, divider, segmented }),
          className
        )}
      >
        {children}
        {/* 알약 모양은 흰 배경이 선택 표시라서 밑줄을 그리지 않아요. */}
        {!segmented && <BaseTabs.Indicator className={s.indicator} />}
      </BaseTabs.List>
    </TabsStyleContext.Provider>
  );
}

type TabProps = Omit<ComponentProps<typeof BaseTabs.Tab>, 'className'> & {
  className?: string;
};

export function TabsTab({ className, ...rest }: TabProps) {
  const { size, fill, segmented } = useContext(TabsStyleContext);
  return (
    <BaseTabs.Tab
      {...rest}
      className={clsx(s.tab({ size, fill, segmented }), className)}
    />
  );
}

type PanelProps = Omit<ComponentProps<typeof BaseTabs.Panel>, 'className'> & {
  className?: string;
};

export function TabsPanel({ className, ...rest }: PanelProps) {
  return <BaseTabs.Panel {...rest} className={clsx(s.panel, className)} />;
}
