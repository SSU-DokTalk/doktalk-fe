import clsx from 'clsx';
import {
  ChevronDown,
  FileText,
  Globe,
  Library,
  LogOut,
  MessagesSquare,
  PenLine,
  Plus,
  Settings,
  UserRound,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Avatar, buttonStyles, iconButtonStyles, Menu } from '@/design-system';
import { useAuth, useLanguage, type LanguageValue } from './hooks';
import * as s from './nav.css';

// 상단 내비의 메뉴는 modal={false}로 둬요. 메뉴가 열린 채 다른 메뉴 버튼을 누르면
// 한 번에 옮겨 가고, 페이지 스크롤도 막지 않아요.

/** 화면 언어 고르기. showLabel이면 지구본 옆에 현재 언어 이름도 보여줘요. */
export function LanguageMenu({ showLabel = false }: { showLabel?: boolean }) {
  const { t } = useTranslation();
  const { languages, current, currentLabel, change } = useLanguage();

  return (
    <Menu.Root modal={false}>
      <Menu.Trigger
        aria-label={t('component.shell.language-current', {
          lang: currentLabel,
        })}
        className={clsx(
          iconButtonStyles({ variant: 'ghost', size: 'md', shape: 'rounded' }),
          showLabel && s.languageTriggerLabelled
        )}
      >
        <Globe aria-hidden='true' />
        {showLabel && <span aria-hidden='true'>{currentLabel}</span>}
      </Menu.Trigger>
      <Menu.Content>
        <Menu.RadioGroup
          value={current.value}
          onValueChange={(value) => change(value as LanguageValue)}
        >
          {languages.map((language) => (
            <Menu.RadioItem
              key={language.value}
              value={language.value}
              lang={language.htmlLang}
            >
              {t(language.labelKey)}
            </Menu.RadioItem>
          ))}
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu.Root>
  );
}

/** 토론방·요약·게시글 만들기 */
export function CreateMenu() {
  const { t } = useTranslation();

  return (
    <Menu.Root modal={false}>
      <Menu.Trigger
        className={buttonStyles({ variant: 'primary', size: 'md' })}
      >
        <Plus aria-hidden='true' />
        <span className={s.createLabel}>{t('component.shell.create')}</span>
        <ChevronDown aria-hidden='true' />
      </Menu.Trigger>
      <Menu.Content>
        <Menu.LinkItem render={<Link to='/debate/create' />}>
          <MessagesSquare aria-hidden='true' />
          {t('page.create-debate.title')}
        </Menu.LinkItem>
        <Menu.LinkItem render={<Link to='/summary/create' />}>
          <FileText aria-hidden='true' />
          {t('page.create-summary.title')}
        </Menu.LinkItem>
        <Menu.LinkItem render={<Link to='/post' />}>
          <PenLine aria-hidden='true' />
          {t('component.modal.write-post.title')}
        </Menu.LinkItem>
      </Menu.Content>
    </Menu.Root>
  );
}

/** 프로필 사진 + 이름을 누르면 여는 내 계정 메뉴 */
export function ProfileMenu() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const name = user.name ?? t('component.navigation.topnav.nickname-fallback');

  return (
    <Menu.Root modal={false}>
      <Menu.Trigger className={s.profileTrigger}>
        <Avatar name={name} src={user.profile} size={34} />
        <span className={s.profileName}>
          <b>{name}</b>
          {t('component.topnav.user.postfix')}
        </span>
        <ChevronDown aria-hidden='true' />
      </Menu.Trigger>
      <Menu.Content>
        <div className={s.menuHeader}>
          <Avatar name={name} src={user.profile} size={36} />
          {name}
        </div>
        <Menu.LinkItem render={<Link to='/mypage' />}>
          <UserRound aria-hidden='true' />
          {t('component.topnav.dropdown.mypage')}
        </Menu.LinkItem>
        <Menu.LinkItem render={<Link to='/mypage/library' />}>
          <Library aria-hidden='true' />
          {t('component.floating.text.library')}
        </Menu.LinkItem>
        <Menu.LinkItem render={<Link to='/settings' />}>
          <Settings aria-hidden='true' />
          {t('component.topnav.dropdown.settings')}
        </Menu.LinkItem>
        <Menu.Separator />
        <Menu.Item onClick={logout}>
          <LogOut aria-hidden='true' />
          {t('component.topnav.dropdown.logout')}
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
}
