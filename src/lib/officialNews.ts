import fallbackNews from "@/content/official-news.json";

const NEWS_ENDPOINT = "https://api.spaceappschallenge.org/graphql";
const NEWS_SOURCE = "https://www.spaceappschallenge.org/blog/";
const NEWS_QUERY = `{ blogs(first: 6) { edges { node { title subTitle meta { firstPublishedAt relativeUrl } featuredImage { alt rendition { fullUrl } } } } } }`;
const OFFICIAL_HOST = "www.spaceappschallenge.org";
const OFFICIAL_ORIGIN = `https://${OFFICIAL_HOST}`;
const ASSET_HOST = "assets.spaceappschallenge.org";

export type OfficialNewsArticle = {
  title: string;
  summary: string;
  publishedAt: string;
  url: string;
  image: string;
  imageAlt: string;
};

type NewsResponse = {
  errors?: unknown;
  data?: {
    blogs?: {
      edges?: Array<{
        node: {
          title: string;
          subTitle: string;
          meta: { firstPublishedAt: string; relativeUrl: string };
          featuredImage: { alt: string; rendition: { fullUrl: string } };
        };
      }>;
    };
  };
};

function validateArticle(article: OfficialNewsArticle) {
  const articleUrl = new URL(article.url);
  const imageUrl = new URL(article.image);

  if (
    articleUrl.hostname !== OFFICIAL_HOST ||
    !articleUrl.pathname.startsWith("/blog/") ||
    imageUrl.hostname !== ASSET_HOST
  ) {
    throw new Error("The official news API returned an unexpected URL.");
  }

  return article;
}

export async function getOfficialNews(): Promise<{
  source: string;
  articles: OfficialNewsArticle[];
}> {
  try {
    const response = await fetch(NEWS_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query: NEWS_QUERY }),
      next: { revalidate: 3600, tags: ["official-news"] },
    });

    if (!response.ok) {
      throw new Error(`Official news request failed with ${response.status}.`);
    }

    const result = (await response.json()) as NewsResponse;
    const edges = result.data?.blogs?.edges;
    if (result.errors || !edges?.length) {
      throw new Error("The official news response was incomplete.");
    }

    const articles = edges.map(({ node }) =>
      validateArticle({
        title: node.title,
        summary: node.subTitle,
        publishedAt: node.meta.firstPublishedAt,
        url: new URL(node.meta.relativeUrl, OFFICIAL_ORIGIN).toString(),
        image: node.featuredImage.rendition.fullUrl,
        imageAlt: node.featuredImage.alt,
      }),
    );

    return { source: NEWS_SOURCE, articles };
  } catch (error) {
    console.warn("Using the bundled NASA Space Apps news snapshot.", error);
    return { source: fallbackNews.source, articles: fallbackNews.articles };
  }
}
