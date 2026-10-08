# What we need from the organising committee

Every item below is currently a placeholder, a guess carried over from the design
mockups, or an access grant the site cannot work without. Grouped by how badly it
blocks launch.

## A. Blocks launch

1. **Firestore database** — someone with owner access to the `nasaspaceappskandy`
   Firebase project must create the database (production mode, region
   `asia-south1`) and deploy `firestore.rules`. Until then every form fails after a
   12-second timeout. Who owns that project?
2. **reCAPTCHA v3 site key** for Firebase App Check, registered for the
   `nasaspaceapps.lk` domain. Without it the forms are open to scripted spam; the
   honeypot we ship stops naive bots only.
3. **Domain control** — who holds `nasaspaceapps.lk`, and can the nameservers move
   to Cloudflare? If not, we need the ability to add CNAME records instead.
4. **Where submissions go** — which committee email addresses should receive
   registration, volunteer, ambassador and contact submissions, and who is
   responsible for answering each? The forms promise "within 24 hours" (contact)
   and "within 48 hours" (ambassadors).
5. **Confirmation email** — do you want applicants to get an automatic
   confirmation? That needs either a Firebase "Trigger Email" extension (needs the
   Blaze plan, pay-as-you-go but effectively free at this volume) or a free
   Resend/Brevo account. Which do you prefer?

## B. Content that is currently invented

Everything in this section came from the design mockups and must be confirmed or
replaced before the site goes public. Publishing invented names, prize figures and
schedules under a NASA programme banner is the biggest risk on the site.

6. **Event dates and venue.** The site says **3–5 October 2026, Kandy Convention
   Center**, and the countdown is hardcoded to `2026-10-03 09:00` Sri Lanka time.
   Confirm the dates, the start time, and the venue — NASA usually announces the
   global weekend date, so is October 2026 confirmed or provisional?
7. **Prize pool.** "2.5M LKR prize pool" is currently stated as fact. Confirmed?
   Who funds it?
8. **Headline numbers.** "500+ hackers", "50+ schools & unis", "48H sprint",
   "9-province reach", "2000+ students", "2.5M+ reach", "10,000+ international
   participants" (sponsors page). Which are actuals, which are targets? Targets
   must be labelled as targets.
9. **Organising committee members.** The about page lists Sandaruwan Perera,
   Chamindu Herath, Tharushi Silva, Dilantha Bandara with roles. Real people? We
   need the real names, roles, photos and (optionally) LinkedIn URLs.
10. **Workshop speakers.** The events page lists Dr. Aruna Wickrama, Kavindi
    Jayawardena, Malik Gunaratne with dates in September 2026. Real? Confirmed
    dates and times?
11. **Challenge list.** The six challenges shown are invented. NASA publishes the
    official challenge statements a few weeks before the event — do you want the
    page to show "challenges announced in September" until then?
12. **News items.** All three press releases are placeholders, and one is dated
    **15 October 2026**, which is *after* the event it announces registration for.
    Need the real items with real dates.
13. **Sponsors.** The tier wall shows "RESERVED FOR TITLE PARTNER" and placeholder
    platinum/gold logos. Which sponsors are confirmed, at which tier, and can we
    have their logo files (SVG preferred)?
14. **Contact details.** Is `info@nasaspaceapps.lk` live and monitored? Is the
    address "University of Peradeniya Campus, Kandy" correct — the site also calls
    Kandy Convention Center the venue, so which is the organising HQ?
15. **Social links.** The footer and contact page have Facebook, LinkedIn,
    Instagram and X icons that currently link nowhere. Real URLs?
16. **Downloads.** Media kit, brand guidelines, logo pack, press template, social
    assets, sponsorship prospectus and participant toolkits are all simulated
    downloads. Do these files exist? If so, send them; if not, the buttons should
    say "coming soon" rather than pretend.

## C. Legal, brand and policy

17. **NASA brand usage.** Local Space Apps events have rules on using the NASA
    insignia and the Space Apps logo. We are currently rendering a text "NASA" tile
    rather than the real mark — please share the official local-event logo pack and
    the usage guidance you were given.
18. **Code of Conduct and participant terms.** The register page makes applicants
    agree to "the NASA Space Apps Participant Code of Conduct and Open Source
    licensing terms", but there is nothing to link to. Send the URL or the text.
19. **Privacy notice.** We collect names, emails, phone numbers, institutions and
    free-text statements from students, some of them minors. We need a privacy
    statement covering what is stored, where (Google Cloud, Mumbai region), who can
    see it, and how long it is kept. Required by Sri Lanka's PDPA.
20. **Under-18 participants.** Will school students register? If yes, do you need
    parental consent captured at registration?
21. **Photo/press consent** for any participant photographs used later on the news
    page.

## D. Language

22. **Sinhala and Tamil review** — the UI strings we wrote need a native speaker
    from the committee to check them (see `docs/I18N.md`), and we need translated
    body copy if you want the whole site in all three languages.
23. **Default language** when someone arrives with no preference: English, or the
    browser's language?

## E. Nice to have, decide later

24. Google Analytics / Firebase Analytics: keep it? If yes, the privacy notice must
    mention it, and a cookie banner may be needed for EU visitors.
25. A real Open Graph share image (`/og-image.png`, 1200×630). Right now the meta
    tags point at a file that does not exist yet, so link previews show no image.
26. Team formation: do solo registrants need a matchmaking list, or is that handled
    off-site?
27. Do you want the site to also ship as an Android/iOS app (it is an Expo project,
    so this is possible), or is web-only fine?
