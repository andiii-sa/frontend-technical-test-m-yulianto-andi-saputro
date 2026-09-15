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
};