import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export function formatCfp(cfpDate) {
  const cfp = dayjs(cfpDate);
  if (cfp.diff(dayjs(), "days") >= 0) {
    return dayjs(cfpDate).fromNow(true) + " to submit a talk";
  }
  return "";
}

export function formatCreationDate(startDate) {
  return dayjs(startDate).fromNow();
}

export function formatRange(startDate, endDate) {
  const fmtWithYearIfNeeded = (date, pattern) => {
    const thisYear = date.year() === dayjs().year();
    if (thisYear) {
      return date.format(pattern);
    } else {
      return date.format(pattern + " YYYY");
    }
  };
  const start = dayjs(startDate);
  const oneDayEvent = !endDate || endDate === startDate;
  if (oneDayEvent) {
    return fmtWithYearIfNeeded(start, "MMM D");
  } else {
    const end = dayjs(endDate);
    const sameMonth = start.month() == end.month();
    if (sameMonth) {
      return fmtWithYearIfNeeded(end, `MMM ${start.format("D")}-D`);
    } else {
      return start.format("MMM D") + " - " + fmtWithYearIfNeeded(end, "MMM D");
    }
  }
}
