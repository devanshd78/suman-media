import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  return { locale: requested === "mr" ? "mr" : "en", messages: {}, timeZone: "Asia/Kolkata" };
});
