# NASA Space Apps Kandy — Firebase Backend (Cloud Functions)

This directory contains the Firebase Cloud Functions backend for the **NASA Space Apps Kandy 2026** website.

## Architecture

The backend listens to document creation events across all public form collections in Cloud Firestore:

| Firestore Collection | Trigger Function | Purpose |
| --- | --- | --- |
| `messages/{id}` | `onMessageCreated` | Notifies committee of inquiries, sends receipt to sender |
| `volunteers/{id}` | `onVolunteerCreated` | Notifies committee of volunteer/mentor applications |
| `ambassadors/{id}` | `onAmbassadorCreated` | Notifies committee of school/university lead applications |
| `bootcamps/{id}` | `onBootcampCreated` | Notifies committee of pre-hackathon bootcamp RSVPs |
| `registrations/{id}` | `onRegistrationCreated` | Notifies committee of participant/team registrations |
| `/backendHealth` | `backendHealth` | HTTP health check endpoint to verify backend status |

### Actions Performed on Each Submission
1. **Organizer Notification**: Sends a formatted HTML email with all submitted fields to the committee (`info@nasaspaceapps.lk` or `$ORGANIZER_EMAIL`).
2. **Applicant Confirmation**: Sends a branded confirmation receipt to the applicant's email address with their unique reference ID and next steps.
3. **Idempotency & Status Update**: Sets `status: "notified"` and records timestamp and notification details on the Firestore document.

---

## Local Development & Testing

### 1. Install dependencies
```bash
cd functions
npm install
```

### 2. Compile TypeScript
```bash
npm run build
```

### 3. Run with Firebase Emulators
To test locally with the Firebase Emulator Suite (without hitting production):
```bash
npm run serve
```
Or from the project root:
```bash
npm run emulators:start
```

---

## Email Configuration (Production)

By default, if no SMTP configuration is provided, the function safely **simulates** delivery and logs the formatted message to Cloud Logging without errors.

To enable live email delivery via SMTP (e.g., Google Workspace, SendGrid, Amazon SES, or Resend):

Set the following environment variables or Firebase Secrets:

```bash
firebase functions:secrets:set SMTP_HOST
firebase functions:secrets:set SMTP_PORT
firebase functions:secrets:set SMTP_USER
firebase functions:secrets:set SMTP_PASS
firebase functions:secrets:set SMTP_FROM
firebase functions:secrets:set ORGANIZER_EMAIL
```

Example values:
- `SMTP_HOST`: `smtp.gmail.com`
- `SMTP_PORT`: `587`
- `SMTP_USER`: `info@nasaspaceapps.lk`
- `SMTP_PASS`: `your-app-password`
- `SMTP_FROM`: `NASA Space Apps Kandy <info@nasaspaceapps.lk>`
- `ORGANIZER_EMAIL`: `info@nasaspaceapps.lk`

---

## Deployment

Deploy both rules and functions to the `nasaspaceappskandy` project:

```bash
# From root
npm run deploy:all

# Or functions only
npm run deploy:functions
```
