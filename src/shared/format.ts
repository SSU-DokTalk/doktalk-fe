import type { TFunction } from 'i18next';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const INTL_LOCALES: Record<string, string> = {
  kr: 'ko-KR',
  mn: 'mn-MN',
  us: 'en-US',
};

/** 앱 언어 코드(kr·mn·us)를 Intl 로캘로 바꿔요. */
export function intlLocale(language: string) {
  return INTL_LOCALES[language] ?? 'ko-KR';
}

/**
 * 서버 시각은 시간대 표시가 없는 UTC예요 ("2026-10-06T10:30:00").
 * 그대로 new Date()에 넣으면 내 시간대로 읽혀서, 끝에 Z를 붙여 UTC로 읽어요.
 */
export function parseServerDate(value: string | Date): Date {
  if (value instanceof Date) return value;
  const hasZone = /(Z|[+-]\d{2}:?\d{2})$/i.test(value);
  return new Date(hasZone ? value : `${value}Z`);
}

const SECONDS = {
  year: 60 * 60 * 24 * 365,
  month: 60 * 60 * 24 * 30,
  week: 60 * 60 * 24 * 7,
  day: 60 * 60 * 24,
  hour: 60 * 60,
  minute: 60,
} as const;

type Unit = keyof typeof SECONDS;
const UNITS = Object.keys(SECONDS) as Unit[];

const pad = (value: number) => String(value).padStart(2, '0');

/**
 * 몽골어는 브라우저·기기에 따라 Intl 날짜 데이터가 없어서(안드로이드 크롬 등)
 * 한국어로 대체돼 보여요. 그래서 요일·상대 시간 문구는 번역 파일에서 가져오고,
 * 영어 날짜만 Intl(en-US, 모든 브라우저에 있음)을 써요.
 */
function createFormatters(language: string, t: TFunction) {
  const english = language === 'us';
  const number = new Intl.NumberFormat(intlLocale(language));
  const won = new Intl.NumberFormat(intlLocale(language), {
    style: 'currency',
    currency: 'KRW',
  });
  const enMonthDay = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  });
  const enMonthDayTime = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });
  const enDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  /** 10.06 (화) · 다른 해면 2027.01.05 (화) */
  const numericDay = (date: Date) => {
    const monthDay = `${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
    const day =
      date.getFullYear() === new Date().getFullYear()
        ? monthDay
        : `${date.getFullYear()}.${monthDay}`;
    return `${day} (${t(`function.time.weekdays.${date.getDay()}`)})`;
  };
  const clock = (date: Date) =>
    `${pad(date.getHours())}:${pad(date.getMinutes())}`;

  return {
    /** 방금 전 · 3시간 전 · 2일 전 */
    relativeTime(value: string | Date) {
      const elapsed = Math.floor(
        (Date.now() - parseServerDate(value).getTime()) / 1000
      );
      const unit = UNITS.find((candidate) => elapsed >= SECONDS[candidate]);
      if (!unit) return t('function.time.now');
      return t(`function.time.relative.${unit}`, {
        count: Math.floor(elapsed / SECONDS[unit]),
      });
    },

    /** 모임 일시: 10.06 (화) 19:30 */
    meetingDateTime(value: string | Date) {
      const date = parseServerDate(value);
      if (english) return enMonthDayTime.format(date);
      return `${numericDay(date)} ${clock(date)}`;
    },

    /** 시각: 19:30 */
    time(value: string | Date) {
      return clock(parseServerDate(value));
    },

    /** 모임 날짜: 10.06 (화) */
    meetingDate(value: string | Date) {
      const date = parseServerDate(value);
      if (english) return enMonthDay.format(date);
      return numericDay(date);
    },

    /** 2026.09.26 */
    date(value: string | Date) {
      const date = parseServerDate(value);
      if (english) return enDate.format(date);
      return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
    },

    number(value: number) {
      return number.format(value);
    },

    /**
     * 가격은 원화예요(토스 결제). 한국어는 10,000원, 다른 언어는 ₩10,000.
     * 0원은 쓰는 쪽에서 '무료'로 보여줘요.
     */
    price(value: number) {
      return language === 'kr'
        ? `${number.format(value)}원`
        : won.format(value);
    },
  };
}

export type Formatters = ReturnType<typeof createFormatters>;

/** 240KB · 1.2MB */
export function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1).replace(/\.0$/, '')}MB`;
}

/** 지금 언어에 맞춘 날짜·숫자·가격 표시 */
export function useFormat(): Formatters {
  const { t, i18n } = useTranslation();
  return useMemo(() => createFormatters(i18n.language, t), [i18n.language, t]);
}
