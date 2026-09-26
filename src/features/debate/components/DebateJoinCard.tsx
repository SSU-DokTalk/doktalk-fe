import clsx from 'clsx';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Badge,
  Button,
  buttonStyles,
  Skeleton,
  visuallyHidden,
} from '@/design-system';
import type { Debate } from '@/shared/api/models';
import { parseServerDate, useFormat } from '@/shared/format';
import { useDebatePurchase, useJoinFreeDebate } from '../api';
import { CheckoutDialog } from '@/features/payment/components/CheckoutDialog';
import { useReopenCheckout } from '@/features/payment/useReopenCheckout';
import * as s from './DebateJoinCard.css';
import { useAuthHref } from '@/features/auth/redirect';

type DebateJoinCardProps = {
  debate: Debate;
  /** 로그인한 사용자 id (로그아웃이면 0) */
  viewerId: number;
  isHost: boolean;
  /** rail: 오른쪽 칸, inline: 글 안 (모바일·태블릿) */
  variant: 'rail' | 'inline';
};

/**
 * 참여 카드. 개설자 → 참여 중 → 끝난 모임 → 참여 전(무료·유료) 순서로 상태를 골라요.
 * 무료(0원)는 결제 없이 바로 참여해요.
 */
export function DebateJoinCard({
  debate,
  viewerId,
  isHost,
  variant,
}: DebateJoinCardProps) {
  const { t } = useTranslation();
  const loginHref = useAuthHref();
  const format = useFormat();
  const headingId = useId();
  const [checkoutOpen, setCheckoutOpen] = useState(useReopenCheckout());
  const purchase = useDebatePurchase(debate.id, isHost ? 0 : viewerId);
  const join = useJoinFreeDebate(debate, viewerId);

  const ended =
    debate.held_at !== null &&
    debate.held_at !== undefined &&
    parseServerDate(debate.held_at).getTime() < Date.now();
  const free = debate.price <= 0;
  const online = Boolean(debate.link) && !debate.location?.trim();

  const renderBody = () => {
    if (isHost) {
      return (
        <>
          <p className={s.title}>{t('page.debate-detail.join.host')}</p>
          <p className={s.description}>
            {t('page.debate-detail.join.host-description')}
          </p>
        </>
      );
    }

    if (viewerId <= 0) {
      return (
        <>
          <p className={s.description}>
            {t('component.shell.login-card.title')}
          </p>
          <Link
            to={loginHref}
            className={buttonStyles({ size: 'lg', fullWidth: true })}
          >
            {t('component.topnav.login')}
          </Link>
        </>
      );
    }

    if (purchase.isPending) {
      return <Skeleton height={96} radius={12} />;
    }

    if (purchase.data) {
      return (
        <>
          <Badge tone='brand' size='md'>
            {t('page.debate-detail.join.joined')}
          </Badge>
          <p className={s.description}>
            {online
              ? t('page.debate-detail.join.joined-online')
              : t('page.debate-detail.join.joined-offline')}
          </p>
        </>
      );
    }

    if (ended) {
      return (
        <>
          <p className={s.title}>{t('page.debate-detail.join.ended')}</p>
          <p className={s.description}>
            {t('page.debate-detail.join.ended-description')}
          </p>
        </>
      );
    }

    return (
      <>
        <p className={s.label}>{t('page.debate-detail.join.fee')}</p>
        <p className={s.price}>
          {free
            ? t('page.debate-detail.join.free')
            : format.price(debate.price)}
        </p>
        <p className={s.description}>
          {free
            ? t('page.debate-detail.join.free-description')
            : t('page.debate-detail.payment.title')}
        </p>
        {free ? (
          <Button
            size='lg'
            fullWidth
            loading={join.isPending}
            onClick={() => join.mutate()}
          >
            {t('page.debate-detail.join.join')}
          </Button>
        ) : (
          <>
            <Button size='lg' fullWidth onClick={() => setCheckoutOpen(true)}>
              {t('page.debate-detail.join.pay')}
            </Button>
            <CheckoutDialog
              product={{
                type: 'D',
                id: debate.id,
                title: debate.title,
                price: debate.price,
                cover: { title: debate.book.title, src: debate.book.image },
                meta: [debate.user.name, debate.book.title]
                  .filter(Boolean)
                  .join(' · '),
              }}
              open={checkoutOpen}
              onOpenChange={setCheckoutOpen}
            />
          </>
        )}
        {join.isError && (
          <p role='alert' className={s.alert}>
            {t('page.debate-detail.join.error')}
          </p>
        )}
      </>
    );
  };

  return (
    <section
      aria-labelledby={headingId}
      className={clsx(s.card, variant === 'rail' ? s.rail : s.inline)}
    >
      <h2 id={headingId} className={visuallyHidden}>
        {t('page.debate-detail.join.label')}
      </h2>
      {renderBody()}
    </section>
  );
}
