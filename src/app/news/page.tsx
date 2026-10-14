import type { Metadata } from "next";
import Image from "next/image";
import { BroadcastIcon as Radio } from "@phosphor-icons/react/dist/ssr/Broadcast";
import { PageIntro, ActionLink, CommunityBand, SectionLabel } from "@/components/Elements";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowUpRight";
import { LocalizedText as L } from "@/components/LocalizedText";
import { createPageMetadata } from "@/content/metadata";
import { getOfficialNews } from "@/lib/officialNews";

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const formatDate = (date: string) => dateFormatter.format(new Date(date));

export const revalidate = 3600;

export const metadata: Metadata = createPageMetadata({
  title: "News & updates",
  description: "Follow official NASA Space Apps news and updates relevant to the Kandy community and the 2026 challenge.",
  path: "/news",
});

export default async function News() {
  const news = await getOfficialNews();
  return (
    <main id="main">
      <PageIntro
        label={<L id="news.intro.label" />}
        title={<L id="news.intro.title" />}
        description={<L id="news.intro.description" />}
      />
      <section className="content-section">
        <div className="empty-state local-news-summary">
          <Radio size={36} weight="regular" aria-hidden="true" />
          <div className="local-news-copy">
            <h2><L id="news.local.title" /></h2>
            <p>
              <L id="news.local.prefix" />{" "}
              <strong className="local-news-highlight"><L id="news.local.highlight" /></strong>{" "}
              <L id="news.local.details" />
            </p>
          </div>
          <ActionLink href="/event-details" outline>
            <L id="news.local.cta" />
          </ActionLink>
        </div>
      </section>
      <section className="content-section official-news">
        <div className="news-heading">
          <div>
            <SectionLabel>
              <L id="news.official.label" />
            </SectionLabel>
            <h2>
              <L id="news.official.title" />
            </h2>
          </div>
          <a
            className="text-link"
            href={news.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            <L id="news.official.cta" />
            <ArrowUpRightIcon size={17} aria-hidden="true" />
          </a>
        </div>
        <div className="news-grid">
          {news.articles.map((article) => (
            <article className="news-card" key={article.url}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news-card-link"
              >
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  width={300}
                  height={200}
                  loading="lazy"
                />
                <div className="news-card-copy">
                  <div className="news-meta">
                    <time dateTime={article.publishedAt}>
                      {formatDate(article.publishedAt)}
                    </time>
                    <span>
                      {article.publishedAt.startsWith("2026")
                        ? "2026 UPDATE"
                        : "FROM THE ARCHIVE"}
                    </span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                  <span className="news-read">
                    <L id="news.readCta" />
                    <ArrowUpRightIcon size={17} aria-hidden="true" />
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
        <p className="asset-credit">
          Articles and images: NASA Space Apps. This feed refreshes
          automatically. Dates shown are the original publication dates.
        </p>
      </section>
      <CommunityBand />
    </main>
  );
}
