import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const endpoint = "https://api.spaceappschallenge.org/graphql";
const source = "https://www.spaceappschallenge.org/blog/";
const officialOrigin = "https://www.spaceappschallenge.org";
const outputUrl = new URL("../src/content/official-news.json", import.meta.url);
const query = `{ blogs(first: 6) { edges { node { title subTitle meta { firstPublishedAt relativeUrl } featuredImage { alt rendition { fullUrl } } } } } }`;

const response = await fetch(endpoint, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ query }),
});

if (!response.ok) {
  throw new Error(`Official news request failed with ${response.status}.`);
}

const result = await response.json();
const edges = result.data?.blogs?.edges;

if (result.errors || !edges?.length) {
  throw new Error("The official news feed did not return valid articles.");
}

const articles = edges.map(({ node }) => {
  if (!node.meta.relativeUrl.startsWith("/blog/")) {
    throw new Error("The official news feed returned an unexpected article URL.");
  }

  return {
    title: node.title,
    summary: node.subTitle,
    publishedAt: node.meta.firstPublishedAt,
    url: new URL(node.meta.relativeUrl, officialOrigin).toString(),
    image: node.featuredImage.rendition.fullUrl,
    imageAlt: node.featuredImage.alt,
  };
});

const output = `${JSON.stringify({ source, articles }, null, 2)}\n`;
await writeFile(outputUrl, output, "utf8");

console.log(
  `Synced ${articles.length} official news articles to ${fileURLToPath(outputUrl)}.`,
);
