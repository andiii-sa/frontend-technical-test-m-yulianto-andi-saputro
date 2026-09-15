import moment from "moment";

export { cn } from "cn"

export const convertDate = (
  date: Date | string,
  format = "DD/MM/YYYY",
  isUtc = false
): string => {

  if (!date ) return "";
  if (isUtc) {
    return moment.utc(date).format(format);
  }
  return moment(date).format(format);
};

export const typeBadgeStatusPurchase = {
    SUBMITTED: "blue",
    APPROVED: "green",
    DRAFT: "gray",
    REJECTED: "red",
    PARTIALLY_RECEIVED: 'yellow',
    ORDERED: "blue",
    RECEIVED: "green",
    CANCELLED: "red",
};

const numFmt = new Intl.NumberFormat("en-US");
export const formatNumber = (n: number) => numFmt.format(n);