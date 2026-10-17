import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";

function readLaunchConfiguration(mode?: string) {
  const env = { ...process.env };
  if (mode === undefined) delete env.SITE_LAUNCH_MODE;
  else env.SITE_LAUNCH_MODE = mode;

  const result = execFileSync(process.execPath, ["--import", "tsx", "-e", `
    const config = require('./next.config.ts').default;
    const sitemap = require('./src/app/sitemap.ts').default;
    const { isComingSoon } = require('./src/lib/launch-mode.ts');
    Promise.resolve(config.redirects()).then(redirects => {
      console.log(JSON.stringify({ isComingSoon, redirects, sitemap: sitemap() }));
    });
  `], { cwd: process.cwd(), env, encoding: "utf8" });

  return JSON.parse(result) as {
    isComingSoon: boolean;
    redirects: { source: string; destination: string; permanent: boolean }[];
    sitemap: { url: string }[];
  };
}

test("coming soon mode defaults to temporary official registration and hides unfinished routes", () => {
  const configuration = readLaunchConfiguration();
  assert.equal(configuration.isComingSoon, true);
  assert.deepEqual(configuration.redirects.find(({ source }) => source === "/register/:path*"), {
    source: "/register/:path*",
    destination: "https://www.spaceappschallenge.org/2026/local-events/kandy/",
    permanent: false,
  });
  assert.ok(configuration.redirects.some(({ source, destination }) => source === "/join/:path*" && destination === "/"));
  assert.ok(configuration.redirects.every(({ permanent }) => permanent === false));
  assert.ok(configuration.sitemap.every(({ url }) => new URL(url).host === "www.nasaspaceapps.lk"));
  assert.deepEqual(configuration.sitemap.map(({ url }) => new URL(url).pathname), ["/", "/privacy", "/terms"]);
});

test("live mode restores normal routes and the full sitemap", () => {
  const configuration = readLaunchConfiguration("live");
  assert.equal(configuration.isComingSoon, false);
  assert.deepEqual(configuration.redirects, []);
  assert.ok(configuration.sitemap.some(({ url }) => new URL(url).pathname === "/register"));
  assert.ok(configuration.sitemap.some(({ url }) => new URL(url).pathname === "/news"));
});
