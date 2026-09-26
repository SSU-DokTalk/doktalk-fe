import clsx from 'clsx';
import { ChevronRight, LogIn } from 'lucide-react';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Avatar, Button, buttonStyles, Dialog } from '@/design-system';
import { deleteAccount } from '@/features/auth/api';
import { useAuthHref } from '@/features/auth/redirect';
import { ProfileEditDialog } from '@/features/profile/components/ProfileEditDialog';
import { useMe } from '@/features/user/api';
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle';
import { useAuth, useLanguage, type LanguageValue } from '@/shell/hooks';
import { APP_VERSION, SITE_LINKS } from '@/shell/navigation';
import * as s from './SettingsPage.css';

/** 언어 이름은 그 언어로 적어요. 지금 언어를 못 읽는 사람도 자기 언어를 찾을 수 있게요. */
const NATIVE_NAMES: Record<LanguageValue, string> = {
  mn: 'Монгол хэл',
  kr: '한국어',
  us: 'English',
};

/** 순서: 고객 지원 목록 */
const SUPPORT_ORDER = ['notice', 'faq', 'contact', 'terms', 'privacy'];

function DeleteAccountDialog({
  open,
  onOpenChange,
  onDeleted,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
}) {
  const { t } = useTranslation();
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleDelete = async () => {
    setPending(true);
    setFailed(false);
    try {
      await deleteAccount();
      onDeleted();
    } catch {
      setFailed(true);
      setPending(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content width={420}>
        <Dialog.Header
          title={t('page.settings.delete-confirm-title')}
          closeLabel={t('component.dialog.close')}
        />
        <Dialog.Body>
          <Dialog.Description className={s.dialogText}>
            {t('page.settings.delete-confirm-description')}
          </Dialog.Description>
          {failed && (
            <p role='alert' className={s.dialogError}>
              {t('page.settings.delete-error')}
            </p>
          )}
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.Close
            render={
              <Button variant='neutral'>{t('component.form.cancel')}</Button>
            }
          />
          <Button
            variant='danger'
            loading={pending}
            onClick={() => void handleDelete()}
          >
            {t('page.settings.delete-button')}
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}

/** 설정 (/settings). 서버가 지원하는 것만 둬요: 계정, 언어, 고객 지원, 로그아웃·탈퇴 */
function SettingsPage() {
  const { t } = useTranslation();
  const { user, isLoggedIn, logout } = useAuth();
  const viewerId = isLoggedIn ? (user.id ?? 0) : 0;
  const me = useMe(viewerId);
  const { current, change } = useLanguage();
  const loginHref = useAuthHref();
  const accountId = useId();
  const languageId = useId();
  const supportId = useId();
  const manageId = useId();
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useDocumentTitle(t('page.settings.title'));

  const name = me.data?.name || user.name || t('component.user.unknown');
  const supportLinks = SUPPORT_ORDER.flatMap((key) =>
    SITE_LINKS.filter((link) => link.key === key)
  );

  return (
    <div className={s.page}>
      <h1 className={s.title}>{t('page.settings.title')}</h1>

      {isLoggedIn ? (
        <section aria-labelledby={accountId} className={s.section}>
          <h2 id={accountId} className={s.sectionTitle}>
            {t('page.settings.account')}
          </h2>
          <dl className={s.list}>
            <div className={s.row}>
              <dt className={s.term}>{t('page.settings.email')}</dt>
              <dd className={s.value}>{me.data?.email ?? '–'}</dd>
            </div>
            <div className={s.row}>
              <dt className={s.term}>{t('page.settings.profile')}</dt>
              <dd className={s.value}>
                <Avatar
                  name={name}
                  src={me.data?.profile ?? user.profile}
                  size={40}
                />
                <span className={s.profileText}>
                  <span className={s.profileName}>{name}</span>
                  <span className={s.profileHint}>
                    {t('page.settings.profile-description')}
                  </span>
                </span>
                {me.data && (
                  <Button
                    variant='neutral'
                    size='sm'
                    aria-haspopup='dialog'
                    className={s.valueAction}
                    onClick={() => setEditing(true)}
                  >
                    {t('component.section.profile.button.edit-profile')}
                  </Button>
                )}
              </dd>
            </div>
          </dl>
        </section>
      ) : (
        <section className={s.loginPrompt}>
          <p className={s.dialogText}>{t('page.settings.login-prompt')}</p>
          <Link to={loginHref} className={buttonStyles({ variant: 'primary' })}>
            <LogIn aria-hidden='true' />
            {t('component.topnav.login')}
          </Link>
        </section>
      )}

      <section aria-labelledby={languageId} className={s.section}>
        <h2 id={languageId} className={s.sectionTitle}>
          {t('page.settings.language')}
        </h2>
        <p className={s.description}>
          {t('page.settings.language-description')}
        </p>
        <fieldset aria-labelledby={languageId} className={s.languages}>
          {(Object.keys(NATIVE_NAMES) as LanguageValue[]).map((value) => (
            <label
              key={value}
              lang={value === 'kr' ? 'ko' : value === 'us' ? 'en' : 'mn'}
              className={s.language}
            >
              <input
                type='radio'
                name='language'
                value={value}
                checked={current.value === value}
                onChange={() => change(value)}
              />
              {NATIVE_NAMES[value]}
            </label>
          ))}
        </fieldset>
      </section>

      <section aria-labelledby={supportId} className={s.section}>
        <h2 id={supportId} className={s.sectionTitle}>
          {t('page.settings.support')}
        </h2>
        {supportLinks.map((link) => (
          <Link
            key={link.key}
            to={link.to}
            className={clsx(
              s.linkRow,
              'emphasis' in link && link.emphasis && s.linkEmphasis
            )}
          >
            {t(link.labelKey)}
            <ChevronRight aria-hidden='true' className={s.chevron} />
          </Link>
        ))}
      </section>

      {isLoggedIn && (
        <section aria-labelledby={manageId} className={s.section}>
          <h2 id={manageId} className={s.sectionTitle}>
            {t('page.settings.manage')}
          </h2>
          <div className={s.manageRow}>
            <span className={s.manageText}>
              <span className={s.manageTitle}>
                {t('component.topnav.dropdown.logout')}
              </span>
              <span className={s.manageHint}>
                {t('page.settings.logout-description')}
              </span>
            </span>
            <Button variant='neutral' size='sm' onClick={logout}>
              {t('component.topnav.dropdown.logout')}
            </Button>
          </div>
          <div className={s.manageRow}>
            <span className={s.manageText}>
              <span className={s.manageTitle}>{t('page.settings.delete')}</span>
              <span className={s.manageHint}>
                {t('page.settings.delete-description')}
              </span>
            </span>
            <Button
              variant='danger'
              size='sm'
              aria-haspopup='dialog'
              onClick={() => setDeleting(true)}
            >
              {t('page.settings.delete-button')}
            </Button>
          </div>
        </section>
      )}

      <footer className={s.footer}>
        <span>{t('page.settings.version', { version: APP_VERSION })}</span>
        <span>© DokTalk</span>
      </footer>

      {me.data && (
        <ProfileEditDialog
          user={me.data}
          open={editing}
          onOpenChange={setEditing}
        />
      )}
      <DeleteAccountDialog
        open={deleting}
        onOpenChange={setDeleting}
        onDeleted={logout}
      />
    </div>
  );
}

export default SettingsPage;
