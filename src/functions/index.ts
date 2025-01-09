import dayjs from "dayjs";
import duration, { Duration } from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Etc/GMT");

export function getTimeDiff(timeToCompare: Date): string {
  let utcDateTime = dayjs.tz(timeToCompare);
  let timeDiffDuration: Duration = dayjs.duration(
    dayjs().diff(dayjs(utcDateTime))
  );
  let yearDiff: number = parseInt(timeDiffDuration.format("Y"));
  let monthDiff: number = parseInt(timeDiffDuration.format("M"));
  let dateDiff: number = parseInt(timeDiffDuration.format("D"));
  let hourDiff: number = parseInt(timeDiffDuration.format("H"));
  let minuteDiff: number = parseInt(timeDiffDuration.format("m"));
  let secondDiff: number = parseInt(timeDiffDuration.format("s"));

  if (yearDiff > 0) {
    return `${yearDiff}년 전`;
  } else if (monthDiff > 0) {
    return `${monthDiff}달 전`;
  } else if (dateDiff > 0) {
    return `${dateDiff}일 전`;
  } else if (hourDiff > 0) {
    return `${hourDiff}시간 전`;
  } else if (minuteDiff > 0) {
    return `${minuteDiff}분 전`;
  } else if (secondDiff > 0) {
    return `${secondDiff}초 전`;
  } else {
    return "방금 전";
  }
}

export function getDate(date: Date): string {
  let offset = new Date().getTimezoneOffset();
  return dayjs(date.getTime() - offset * 60 * 1000).format("YYYY.MM.DD");
}

export function getDateTime(date: Date): string {
  let offset = new Date().getTimezoneOffset();
  return dayjs(date.getTime() - offset * 60 * 1000).format(
    "YYYY-MM-DD HH:mm:ss"
  );
}

export function getFileTypeFromUrl(url: string): string {
  let urlSplit = url.split(".");
  return urlSplit.length == 1 ? "" : urlSplit[urlSplit.length - 1];
}
