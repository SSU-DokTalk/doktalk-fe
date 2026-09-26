/**
 * 讀:TALK 디자인 시스템
 *
 * 새 화면과 컴포넌트는 여기서만 가져다 써요.
 * `import { Button, Tabs, vars } from '@/design-system';`
 */
import './styles/fonts.css';

import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from './components/Dialog/Dialog';
import {
  MenuContent,
  MenuGroupLabel,
  MenuItem,
  MenuLinkItem,
  MenuRadioItem,
  MenuSeparator,
} from './components/Menu/Menu';
import { TabsList, TabsPanel, TabsRoot, TabsTab } from './components/Tabs/Tabs';

export { vars } from './tokens/theme.css';
export {
  breakpoints,
  fontSize,
  fontWeight,
  inputFontSize,
  layout,
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
  default as Checkbox,
  type CheckboxProps,
} from './components/Checkbox/Checkbox';
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
  default as Select,
  type SelectProps,
} from './components/Select/Select';
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

/**
 * 버튼을 누르면 뜨는 메뉴예요. 화살표 키로 항목을 옮겨 다니고 Esc로 닫혀요.
 *
 * ```tsx
 * <Menu.Root>
 *   <Menu.Trigger className={buttonStyles({ variant: 'ghost' })}>열기</Menu.Trigger>
 *   <Menu.Content>
 *     <Menu.LinkItem render={<Link to='/mypage' />}>마이페이지</Menu.LinkItem>
 *     <Menu.Separator />
 *     <Menu.Item onClick={logout}>로그아웃</Menu.Item>
 *   </Menu.Content>
 * </Menu.Root>
 * ```
 */
export const Menu = {
  Root: BaseMenu.Root,
  Trigger: BaseMenu.Trigger,
  Content: MenuContent,
  Item: MenuItem,
  LinkItem: MenuLinkItem,
  Group: BaseMenu.Group,
  GroupLabel: MenuGroupLabel,
  RadioGroup: BaseMenu.RadioGroup,
  RadioItem: MenuRadioItem,
  Separator: MenuSeparator,
};

/**
 * 모달·시트·서랍이에요. 열린 동안 뒤 화면은 조작할 수 없고 포커스가 안에 머물러요.
 *
 * ```tsx
 * <Dialog.Root open={open} onOpenChange={setOpen}>
 *   <Dialog.Content placement='right'>
 *     <Dialog.Header title='메뉴' closeLabel='메뉴 닫기' />
 *     <Dialog.Body>…</Dialog.Body>
 *   </Dialog.Content>
 * </Dialog.Root>
 * ```
 */
export const Dialog = {
  Root: BaseDialog.Root,
  Trigger: BaseDialog.Trigger,
  Close: BaseDialog.Close,
  Content: DialogContent,
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
  Title: BaseDialog.Title,
  Description: BaseDialog.Description,
};
