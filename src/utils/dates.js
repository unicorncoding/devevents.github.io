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

export function tomorrow() {
  return dayjs()
    .add(1, "day")
    .toDate();
}

export function formatCreationDate(startDate) {
  return dayjs(startDate).fromNow();
}

export function years() {
  const yearNow = dayjs().year();
  const yearNext = dayjs()
    .add(1, "year")
    .year();
  return `${yearNow}/${yearNext}`;
}

export function formatRange(startDate, endDate) {
  const start = dayjs(startDate);
  const oneDayEvent = !endDate || endDate === startDate;
  if (oneDayEvent) {
    return start.format("MMM D");
  } else {
    const end = dayjs(endDate);
    const sameMonth = start.month() == end.month();
    if (sameMonth) {
      return end.format(`MMM ${start.format("D")}-D`);
    } else {
      return start.format("MMM D") + " - " + end.format("MMM D");
    }
  }
}
