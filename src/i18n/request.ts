import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  return { locale: requested === "en" ? "en" : "mr", messages: {}, timeZone: "Asia/Kolkata" };
});
