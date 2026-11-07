import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";
import { eventFaq, faqAnswerText } from "../src/content/faq";
import { sitePages } from "../src/content/pages";

// Launch mode is read when modules load, so each mode renders in its own process.
function renderSeo(mode?: string) {
  const env = { ...process.env };
  if (mode === undefined) delete env.SITE_LAUNCH_MODE;
  else env.SITE_LAUNCH_MODE = mode;

  const result = execFileSync(process.execPath, ["--import", "tsx", "-e", `
    const ai = require('./src/lib/ai-content.ts');
    const data = require('./src/lib/structured-data.ts');
    const { eventFaq } = require('./src/content/faq.ts');
    console.log(JSON.stringify({
      llms: ai.llmsTxt(),
      full: ai.llmsFullTxt(),
      index: ai.indexMarkdown(),
      event: data.hackathonEventJsonLd,
      faq: data.faqJsonLd(eventFaq),
    }));
  `], { cwd: process.cwd(), env, encoding: "utf8" });

  return JSON.parse(result) as {
    llms: string;
    full: string;
    index: string;
    event: { startDate: string; endDate: string; url: string; organizer: unknown[] };
    faq: { mainEntity: { name: string; acceptedAnswer: { text: string } }[] };
  };
}

const sitePaths = (markdown: string) =>
  [...markdown.matchAll(/\]\(https:\/\/www\.nasaspaceapps\.lk(\/[^)#]*)?/g)].map((match) => match[1] ?? "/");

test("page titles and descriptions fit search result limits", () => {
  for (const [path, page] of Object.entries(sitePages)) {
    assert.ok(page.description.length <= 160, `${path} description is ${page.description.length} characters`);
    assert.ok(page.title.length <= 62, `${path} title is ${page.title.length} characters`);
  }
});

test("FAQ structured data matches the visible questions in plain text", () => {
  const { faq } = renderSeo("live");
  assert.equal(faq.mainEntity.length, eventFaq.length);
  faq.mainEntity.forEach((question, index) => {
    assert.equal(question.name, eventFaq[index].question);
    assert.equal(question.acceptedAnswer.text, faqAnswerText(eventFaq[index].answer));
    assert.doesNotMatch(question.acceptedAnswer.text, /[[\]<>]/);
  });
});

test("coming soon AI summaries only link to public pages", () => {
  const { llms, full, index, event } = renderSeo();
  const hidden = ["/how-to-register", "/event-details", "/sponsors-and-partners", "/join", "/about", "/contact", "/challenges", "/news"];
  for (const markdown of [llms, full, index]) {
    for (const path of sitePaths(markdown)) {
      assert.ok(!hidden.some((route) => path.startsWith(route)), `links to hidden route ${path}`);
    }
  }
  assert.equal(new URL(event.url).pathname, "/");
});

test("live AI summaries and event data describe the full site", () => {
  const { llms, full, event } = renderSeo("live");
  assert.ok(sitePaths(llms).includes("/event-details"));
  assert.match(full, /## Schedule/);
  assert.match(full, /SLIIT Kandy UNI/);
  assert.equal(event.startDate, "2026-11-14T00:00:00+05:30");
  assert.equal(event.endDate, "2026-11-16T00:00:00+05:30");
  assert.equal(new URL(event.url).pathname, "/event-details");
  assert.ok(event.organizer.length > 1, "co-organizers are listed as organizers");
});
