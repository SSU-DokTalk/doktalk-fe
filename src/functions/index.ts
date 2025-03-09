import dayjs from 'dayjs';
import duration, { Duration } from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useTranslation } from 'react-i18next';
import { CATEGORY } from '@/common/variables';
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Etc/GMT');

export function getTimeDiff(timeToCompare: Date): string {
  let utcDateTime = dayjs.tz(timeToCompare);
  let timeDiffDuration: Duration = dayjs.duration(
    dayjs().diff(dayjs(utcDateTime))
  );
  let yearDiff: number = parseInt(timeDiffDuration.format('Y'));
  let monthDiff: number = parseInt(timeDiffDuration.format('M'));
  let dateDiff: number = parseInt(timeDiffDuration.format('D'));
  let hourDiff: number = parseInt(timeDiffDuration.format('H'));
  let minuteDiff: number = parseInt(timeDiffDuration.format('m'));
  let secondDiff: number = parseInt(timeDiffDuration.format('s'));

  const { t } = useTranslation();

  if (yearDiff > 0) {
    return `${yearDiff}${t('function.time.year')}${t('function.time.ago')}`;
  } else if (monthDiff > 0) {
    return `${monthDiff}${t('function.time.month')}${t('function.time.ago')}`;
  } else if (dateDiff > 0) {
    return `${dateDiff}${t('function.time.day')}${t('function.time.ago')}`;
  } else if (hourDiff > 0) {
    return `${hourDiff}${t('function.time.hour')}${t('function.time.ago')}`;
  } else if (minuteDiff > 0) {
    return `${minuteDiff}${t('function.time.minute')}${t('function.time.ago')}`;
  } else if (secondDiff > 0) {
    return `${secondDiff}${t('function.time.second')}${t('function.time.ago')}`;
  } else {
    return `${t('function.time.now')}`;
  }
}

export function getDate(date: Date): string {
  let offset = new Date().getTimezoneOffset();
  return dayjs(date.getTime() - offset * 60 * 1000).format('YYYY.MM.DD');
}

export function getDateTime(date: Date): string {
  let offset = new Date().getTimezoneOffset();
  return dayjs(date.getTime() - offset * 60 * 1000).format('YYYY-MM-DD HH:mm');
}

export function getFileTypeFromUrl(url: string): string {
  let urlSplit = url.split('.');
  return urlSplit.length == 1 ? '' : urlSplit[urlSplit.length - 1];
}

export function range(size: number, start = 0, step = 1): number[] {
  return [...Array(size).keys()].map((key) => key * step + start);
}

export function getCategoryFromNumber(
  category: number
): (typeof CATEGORY)[string][] {
  let categories: (typeof CATEGORY)[string][] = [];
  if (category & (1 << 0)) categories.push(CATEGORY.POLITICS);
  if (category & (1 << 1)) categories.push(CATEGORY.HUMANITIES);
  if (category & (1 << 2)) categories.push(CATEGORY.ECONOMY);
  if (category & (1 << 3)) categories.push(CATEGORY.HISTORY);
  if (category & (1 << 4)) categories.push(CATEGORY.SCIENCE);
  if (category & (1 << 5)) categories.push(CATEGORY.ESSAY);
  if (category & (1 << 6)) categories.push(CATEGORY.TEENAGER);
  if (category & (1 << 7)) categories.push(CATEGORY.CHILD);
  if (category & (1 << 8)) categories.push(CATEGORY.WEBTOON);
  return categories;
}

export function addCategory(category: number, value: number): number {
  return category | value;
}

export function removeCategory(category: number, value: number): number {
  return category & ~value;
}
