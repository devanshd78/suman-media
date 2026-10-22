import MonetisationHeader from "@/components/monetization/header";
import MiddlePage from "@/components/monetization/middlepage";
import Content from "@/components/monetization/content";
import { NewsBlogsSection } from "@/components/landing/news-blogs-section";

export default function MonetisationPage() {
  return (
    <>
      <MonetisationHeader />
      <MiddlePage />
      <Content />
      <NewsBlogsSection revealText />
    </>
  );
}
