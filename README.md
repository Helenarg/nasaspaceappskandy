# NASA Space Apps Kandy

[![Next.js](https://img.shields.io/badge/Next.js-16.4-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase&logoColor=051A2C)](https://firebase.google.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

The community website for the NASA Space Apps Challenge in Kandy, Sri Lanka. Explore the local event, discover official challenges and news, and find ways to take part.

[Live website](https://nasaspaceapps.lk) | [Official Kandy event and registration](https://www.spaceappschallenge.org/2026/local-events/kandy/)

## About the project

Built with Next.js, React, TypeScript, and Firebase, the site brings together local event information, official NASA Space Apps content, and ways to connect with the Kandy community. It supports English, Sinhala, and Tamil.

Registration takes place on the official NASA Space Apps website. The local site does not collect participant registrations.

## Run locally

Requires Node.js 20.9 or newer and npm.

```sh
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site currently shows a temporary coming-soon page. To preview the full website locally, set `SITE_LAUNCH_MODE=live` in `.env.local` and restart the development server.

Before opening a pull request, run:

```sh
npm run lint
npm run typecheck
npm test
npm run build:web
```

## Firebase

Firebase supports the site's interest and contact forms, with Cloud Functions handling email notifications. See the [Firebase backend README](functions/README.md) for setup and deployment details. Never send test submissions to the production Firebase project.

## Content and contributions

Event dates, registration, challenges, and other official information should be checked against the [NASA Space Apps Challenge](https://www.spaceappschallenge.org/2026/) and the [official Kandy event listing](https://www.spaceappschallenge.org/2026/local-events/kandy/). Keep local Kandy information clearly distinguished from global NASA Space Apps material.

Contributions should preserve responsive layouts and keyboard access. Include screenshots when changing the interface.
