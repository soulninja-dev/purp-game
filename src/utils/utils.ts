export const relativeTimeFrom = (previous: number) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = (new Date() as unknown as number) - previous;

  if (elapsed < msPerMinute) return Math.round(elapsed / 1000) + " seconds ago";
  else if (elapsed < msPerHour)
    return `${Math.round(elapsed / msPerMinute)}min${
      Math.round(elapsed / msPerMinute) > 1 ? "s" : ""
    } ago`;
  else if (elapsed < msPerDay)
    return `${Math.round(elapsed / msPerHour)}hr${
      Math.round(elapsed / msPerHour) > 1 ? "s" : ""
    } ago`;
  else if (elapsed < msPerMonth)
    return `${Math.round(elapsed / msPerDay)} day${
      Math.round(elapsed / msPerDay) > 1 ? "s" : ""
    } ago`;
  else if (elapsed < msPerYear)
    return `${Math.round(elapsed / msPerMonth)} month${
      Math.round(elapsed / msPerMonth) > 1 ? "s" : ""
    } ago`;
  else
    return `${Math.round(elapsed / msPerYear)} yr${
      Math.round(elapsed / msPerYear) > 1 ? "s" : ""
    } ago`;
};
