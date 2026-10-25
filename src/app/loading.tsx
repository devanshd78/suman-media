import { SiteLoadingScreen } from "@/components/states/site-loading-screen";

/** Shown by Next.js while a server route segment is loading. */
export default function LoadingPage() {
  return <SiteLoadingScreen label="Loading page" />;
}
