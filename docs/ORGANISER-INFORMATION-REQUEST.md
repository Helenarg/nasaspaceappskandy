# NASA Space Apps Challenge Kandy 2026
## Organizer Information & Content Intake Request

**Document Version:** 1.0  
**Target Platform:** [nasaspaceapps.lk](https://nasaspaceapps.lk)  
**Date Issued:** October 9, 2026  
**Audience:** NASA Space Apps Kandy Local Leads, Organizing Committee, and Partner Coordinators  

---

### Purpose of this Document

The website for **NASA Space Apps Challenge Kandy 2026** is fully built, responsive across desktop and mobile devices, and translated into English, Sinhala (සිංහල), and Tamil (தமிழ்). 

To ensure the public site displays 100% verified facts, connects to the official NASA infrastructure, and protects participant data, we need the organizing committee to provide or confirm the details listed below.

Please fill in the `[ Insert Details Here ]` fields or return your responses by email/document. Items marked **[P0 - Launch Blocker]** are required before public deployment.

---

## 1. Core Event Logistics & Official Links [P0 - Launch Blocker]

| Required Information | Current Website Placeholder | Confirmed Organizer Value |
|---|---|---|
| **Official Global Event URL** | `https://www.spaceappschallenge.org/2026/` | `[ Confirm official URL ]` |
| **Official Kandy Local Event Page** | Linked to global root | `[ e.g., https://www.spaceappschallenge.org/2026/local-events/kandy/ ]` |
| **Confirmed Local Event Dates** | November 14–15, 2026 (Global NASA Hackathon) | `[ Confirm dates & local hours ]` |
| **Event Format** | In-Person / Hybrid / Virtual | `[ In-Person / Hybrid / Virtual ]` |
| **Physical Venue Name & Address** | *"Kandy Local Venue (To be announced)"* | `[ Venue Name, Building, City, Google Maps link ]` |
| **Primary Inquiries Mailbox** | `info@nasaspaceapps.lk` | `[ Confirm active monitored email address ]` |
| **Official Phone / WhatsApp Contact** | N/A | `[ Optional organizer hotline / WhatsApp community link ]` |

### Official Social Media Links
Please provide the verified public URLs for the Kandy event:
- **Facebook Page / Group:** `[ https://facebook.com/... ]`
- **LinkedIn Page:** `[ https://linkedin.com/company/... ]`
- **Instagram Handle:** `[ https://instagram.com/... ]`
- **X (Twitter) Profile:** `[ https://x.com/... ]`
- **Participant Community Discord / WhatsApp Channel:** `[ Link if public ]`

---

## 2. Event Program, Agenda & Workshops [P1]

The website includes an **Events & Agenda** page to guide participants leading up to the 48-hour sprint.

### A. Pre-Hackathon Workshops (Preparation Series)
If pre-hackathon bootcamps or data workshops are planned, please provide:
1. **Workshop 1:** Title: `[ e.g., Earth Observation Data 101 ]` | Date & Time: `[ Date ]` | Platform/Venue: `[ e.g., Zoom ]` | Registration link: `[ Link ]`
2. **Workshop 2:** Title: `[ Title ]` | Date & Time: `[ Date ]` | Platform/Venue: `[ Platform ]` | Registration link: `[ Link ]`
3. **Workshop 3:** Title: `[ Title ]` | Date & Time: `[ Date ]` | Platform/Venue: `[ Platform ]` | Registration link: `[ Link ]`
*(If no workshops are scheduled yet, we will display an "Upcoming Sessions to be Announced" badge).*

### B. Hackathon Weekend Schedule (November 14–15)
- **Check-in / Opening Ceremony Time:** `[ e.g., Nov 14, 08:30 AM ]`
- **Hacking Begins (Global NASA Start):** `[ e.g., Nov 14, 09:00 AM ]`
- **Mentorship Checkpoints:** `[ e.g., Nov 14 evening / Nov 15 morning ]`
- **Project Submission Deadline:** `[ e.g., Nov 15, 11:59 PM local time ]`
- **Local Presentations / Awards:** `[ Time & date ]`

---

## 3. Challenges & Local Tracks [P1]

NASA publishes official global challenge summaries. Local events may also host optional local prize tracks or practice exercises.

- [ ] **Global Challenges Only:** Participants choose exclusively from NASA's official challenge briefs.
- [ ] **Local Challenge / Special Tracks:** If local sponsors or institutions are providing specialized problem statements:
  - Track Title: `[ Insert Track Title ]`
  - Focus Area: `[ Climate / Agriculture / Space Tech / Robotics / Education ]`
  - Problem Statement / Practice Brief: `[ Brief summary or external link ]`

---

## 4. Sponsors, Institutional Partners & Media Assets [P1]

The **Sponsors** page features tiered sponsor recognition. To display your sponsors accurately:

### Confirmed Sponsor Roster
| Tier | Organization Name | Website URL | Logo File Provided? |
|---|---|---|---|
| **Title / Platinum Partner** | `[ Organization ]` | `[ URL ]` | [ ] SVG / High-res PNG |
| **Gold Partners** | `[ Organization ]` | `[ URL ]` | [ ] SVG / High-res PNG |
| **Silver / Bronze Partners** | `[ Organization ]` | `[ URL ]` | [ ] SVG / High-res PNG |
| **Ecosystem / Venue Partners** | `[ Organization ]` | `[ URL ]` | [ ] SVG / High-res PNG |
| **Academic / University Partners** | `[ Universities ]` | `[ URL ]` | [ ] SVG / High-res PNG |

### Downloadable Documents & Media Kit
The website has designated download actions for partners and press. Please attach the actual PDF/ZIP files or indicate whether they should remain pending:
- [ ] **Sponsorship Prospectus (PDF):** `[ Provide file / keep as 'Contact for Prospectus' ]`
- [ ] **Press Release / Media Kit (ZIP/PDF):** `[ Provide file / keep as 'Contact for Press Kit' ]`
- [ ] **Participant Toolkit (PDF):** `[ Provide file / link to official Space Apps guide ]`

---

## 5. Participation, Roles & Form Handling Policy [P0 - Launch Blocker]

The website currently contains four interactive interest forms:
1. **Register Interest** (`/register`) – Hacker / team interest and track selection.
2. **Campus Ambassadors** (`/ambassadors`) – University/school student ambassador applications across all 9 provinces.
3. **Join Us** (`/join`) – Mentor, Judge, and Volunteer applications.
4. **Contact Us** (`/contact`) – General questions and partnership inquiries.

> **Current Security Status:** Form collection is currently **PAUSED by default** (`EXPO_PUBLIC_ENABLE_LOCAL_FORMS=false`) until the organizer confirms the workflow below.

### Organizer Form Decisions:
1. **Do you want to accept local interest submissions through this website?**
   - [ ] **Yes:** Collect local interest submissions directly into the secure Firebase Firestore database.
   - [ ] **No / External Only:** Redirect the "Register" button directly to the official `spaceappschallenge.org` Kandy registration page.
2. **Team Participation Parameters:**
   - Minimum Team Size: `2` (NASA default)
   - Maximum Team Size: `6` (NASA default)
   - Allow Solo Registrants looking for teams? `[ Yes / No ]`
3. **Minors / School Students Policy:**
   - Are participants under 18 allowed? `[ Yes / No ]`
   - If yes, is parental/guardian consent required? `[ Specify organizer rule ]`
4. **Data Handling & Inbound Response:**
   - Who will receive and review incoming form submissions? `[ Name(s) and Email(s) ]`
   - Note: The site currently provides instant on-screen receipt confirmation. If you require automated outbound emails (e.g., via SendGrid or Postmark), let the technical team know.

---

## 6. Infrastructure, Domain & Hosting Credentials [P0 - Launch Blocker]

To deploy the production site live under the official `.lk` domain:

1. **Domain Name & DNS Access (`nasaspaceapps.lk`):**
   - Who controls DNS records for `nasaspaceapps.lk` (LK Domain Registry / Cloudflare)?
   - Contact Person for DNS: `[ Name & Email ]`
   - Note: The domain requires an active CNAME pointing to Cloudflare Pages and an active SSL certificate.
2. **Firebase Production Project:**
   - Dedicated Firebase Project ID: `[ e.g., nasaspaceapps-kandy-prod ]`
   - Authorized Admin Emails: `[ Email(s) for Firestore rules deployment ]`
   - Google reCAPTCHA v3 / App Check Site Key (for bot protection): `[ Site Key ]`
3. **Cloudflare Pages / GitHub Repository:**
   - Deployment runs automatically via GitHub Actions from `Helenarg/nasaspaceappskandy`.
   - Staging URL: `[ e.g., nasaspaceapps-kandy.pages.dev ]`
   - Production URL: `https://nasaspaceapps.lk`

---

## 7. Organizing Committee Profiles [P2]

If you would like to showcase the organizing team on the **About** page:
For each committee member, please provide:
1. **Full Name:** `[ Name ]`
2. **Event Role:** `[ e.g., Local Lead / Technical Lead / Community Lead / Partnerships Lead ]`
3. **Affiliation / Institution:** `[ University / Company / Organization ]`
4. **LinkedIn or Social Profile:** `[ URL ]`
5. **Headshot Photo:** `[ High-res square image attachment ]`

---

## 8. Language & Localization Review (Sinhala & Tamil) [P1]

The entire website is localized into **Sinhala (සිංහල)** and **Tamil (தமிழ்)** across all 12 routes, form validation, and privacy notices.

- Please designate a native Sinhala speaker and a native Tamil speaker from the organizing team to review the translations for local terminology, place names, and community tone.
- Sinhala Reviewer: `[ Name & Email ]`
- Tamil Reviewer: `[ Name & Email ]`
- Review reference documents: [`docs/reviews/post-fix/01-tamil.md`](post-fix/01-tamil.md) and [`docs/reviews/post-fix/02-sinhala.md`](post-fix/02-sinhala.md).

---

## Submission Checklist Summary

Before public launch, the technical team needs:

- [ ] **1. Confirmed official Kandy event page link on spaceappschallenge.org**
- [ ] **2. Confirmed event dates, venue name, and monitored email address**
- [ ] **3. Decision on local registration forms vs direct official redirect**
- [ ] **4. Sponsor and partner logos (transparent SVG/PNG)**
- [ ] **5. Domain DNS point to Cloudflare Pages & SSL certificate resolution**
- [ ] **6. Production Firebase credentials & App Check site key**
- [ ] **7. Sign-off on Sinhala & Tamil content**

*Please send completed information and asset files to the technical team or submit via pull request/issue.*
