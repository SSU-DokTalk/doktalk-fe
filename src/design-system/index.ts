/**
 * 讀:TALK 디자인 시스템
 *
 * 새 화면과 컴포넌트는 여기서만 가져다 써요.
 * `import { Button, Tabs, vars } from '@/design-system';`
 */
import './styles/fonts.css';

import { TabsList, TabsPanel, TabsRoot, TabsTab } from './components/Tabs/Tabs';

export { vars } from './tokens/theme.css';
export {
  breakpoints,
  mq,
  space,
  typeScale,
  zIndex,
  type TypeVariant,
} from './tokens/scale';
export { focusRing, visuallyHidden } from './styles/utils.css';

export {
  default as Avatar,
  type AvatarProps,
} from './components/Avatar/Avatar';
export { default as Badge, type BadgeProps } from './components/Badge/Badge';
export {
  default as BookCover,
  type BookCoverProps,
} from './components/BookCover/BookCover';
export { stage as bookCoverStage } from './components/BookCover/BookCover.css';
export {
  default as Button,
  type ButtonProps,
} from './components/Button/Button';
export { buttonStyles } from './components/Button/Button.css';
export { default as Card, type CardProps } from './components/Card/Card';
export {
  default as Chip,
  ChipGroup,
  type ChipGroupProps,
  type ChipProps,
} from './components/Chip/Chip';
export {
  default as EmptyState,
  type EmptyStateProps,
} from './components/EmptyState/EmptyState';
export {
  default as IconButton,
  type IconButtonProps,
} from './components/IconButton/IconButton';
export { iconButtonStyles } from './components/IconButton/IconButton.css';
export {
  default as SegmentedControl,
  type SegmentedControlProps,
  type SegmentedOption,
} from './components/SegmentedControl/SegmentedControl';
export {
  default as Skeleton,
  type SkeletonProps,
} from './components/Skeleton/Skeleton';
export {
  default as Spinner,
  type SpinnerProps,
} from './components/Spinner/Spinner';
export { default as Text, type TextProps } from './components/Text/Text';
export {
  default as TextField,
  Textarea,
  type TextareaProps,
  type TextFieldProps,
} from './components/TextField/TextField';

/**
 * 밑줄 탭이에요. 키보드 화살표로 옮겨 다니고, 선택된 탭 아래로 막대가 따라가요.
 *
 * ```tsx
 * <Tabs.Root value={tab} onValueChange={setTab}>
 *   <Tabs.List aria-label='마이페이지 메뉴' scroll divider>
 *     <Tabs.Tab value='post'>게시글</Tabs.Tab>
 *   </Tabs.List>
 *   <Tabs.Panel value='post'>…</Tabs.Panel>
 * </Tabs.Root>
 * ```
 */
export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel,
};
