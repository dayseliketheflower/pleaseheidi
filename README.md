# Heidi — pleaseheidi.com

Static website for the Heidi waitlist and provider application. Deployable to AWS Amplify with zero build steps required.

---

## Project Overview

This is a fully static website (HTML, CSS, JS inline — no framework, no build tool) that includes:

- **`index.html`** — Main landing page with client waitlist form and provider application form
- **`safety.html`** — Full safety page with provider vetting process and session safety framework
- **`legal/terms.html`** — Terms of Use
- **`legal/privacy.html`** — Privacy Policy
- **`legal/conduct.html`** — Code of Conduct
- **`apps-script.js`** — Google Apps Script backend (handles form submissions, sheet writes, and confirmation emails)

Form submissions use `fetch` with `mode: 'no-cors'` pointing to a Google Apps Script Web App URL. The backend appends rows to a Google Sheet and sends confirmation emails via Gmail.

---

## Step 1: Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet.
2. Name it something like **Heidi Signups**.
3. Copy the spreadsheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
4. The Apps Script will automatically create the two tabs with headers the first time it runs. But if you want to create them manually:

**Tab name: `Clients`**
| Timestamp | First Name | Email | City | Referral Source | Interests | Notes |

**Tab name: `Providers`**
| Timestamp | First Name | Last Name | Email | Phone | City | Gender | Orientation | Age | Motivation | Services | Consent Confirmed |

---

## Step 2: Deploy the Apps Script

1. From your Google Sheet, go to **Extensions → Apps Script**.
2. Delete any existing code in the editor.
3. Paste the full contents of `apps-script.js` into the editor.
4. At the top of the script, replace the placeholder values:
   ```javascript
   const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // from Step 1
   const NOTIFY_EMAIL = 'spg95m@protonmail.com';  // already set — confirm this is correct
   ```
5. Click **Save** (disk icon or Cmd+S).
6. Click **Deploy → New deployment**.
7. Click the gear icon next to "Select type" and choose **Web app**.
8. Configure:
   - Description: `Heidi Forms v1`
   - Execute as: **Me**
   - Who has access: **Anyone**
9. Click **Deploy**.
10. Google will ask you to authorize the script — click through the OAuth flow and grant access (Gmail + Sheets).
11. Copy the **Web app URL** — it looks like:
    `https://script.google.com/macros/s/LONG_STRING_HERE/exec`

> **Important:** Every time you edit and redeploy the script, you must create a **New deployment** (not update existing). Updating an existing deployment sometimes requires re-authorizing.

---

## Step 3: Connect the Frontend

1. Open `index.html` in a text editor.
2. Near the top of the `<script>` block, find:
   ```javascript
   const APPS_SCRIPT_URL = 'YOUR_WEB_APP_URL_HERE';
   ```
3. Replace `YOUR_WEB_APP_URL_HERE` with the Web app URL you copied in Step 2.
4. Save the file.

---

## Step 4: Deploy to AWS Amplify

### Connect your repository

1. Push this folder to a GitHub repository (public or private — both work).
2. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/).
3. Click **New app → Host web app**.
4. Connect your GitHub account and select the repo.
5. Select the branch (e.g., `main`).

### Build settings

When Amplify asks for build settings, use the following `amplify.yml` (no build step required for a static site):

```yaml
version: 1
frontend:
  phases:
    build:
      commands: []
  artifacts:
    baseDirectory: /
    files:
      - '**/*'
```

Amplify will serve everything from the root of the repository as-is.

### Custom domain (pleaseheidi.com)

1. In the Amplify Console, go to **App settings → Domain management**.
2. Click **Add domain** and enter `pleaseheidi.com`.
3. Amplify will provide you with a **CNAME record** to add to your DNS provider.
4. In Cloudflare (or your DNS provider):
   - Add the CNAME record Amplify gives you.
   - **Critical:** Set the Cloudflare proxy to **DNS only** (gray cloud), NOT proxied (orange cloud). Amplify manages SSL itself and Cloudflare proxying will break certificate provisioning.
5. Wait for DNS propagation (usually 5–30 minutes, up to 48 hours).
6. Amplify will automatically provision an SSL certificate once DNS is verified.

---

## Step 5: Test Everything

After deploying, test the following:

- [ ] Open `pleaseheidi.com` — landing page loads correctly
- [ ] Submit the client form with all required fields → success state appears (no page reload)
- [ ] Check the **Clients** tab in your Google Sheet — new row should appear
- [ ] Check your inbox at `spg95m@protonmail.com` — founder notification email received
- [ ] Check the client's email inbox — confirmation email received with correct name and city
- [ ] Submit the provider form with all required fields → success state with 5-step roadmap appears
- [ ] Check the **Providers** tab in Google Sheet — new row should appear
- [ ] Check `spg95m@protonmail.com` — provider notification email received
- [ ] Check the provider's email — confirmation email with onboarding steps received
- [ ] Test the felony "Yes" radio — form hides gracefully, no alert dialog
- [ ] Test form validation — try submitting with empty required fields, confirm inline errors appear
- [ ] Test on mobile (375px wide) — all sections and forms should be responsive

---

## Troubleshooting

**CORS errors in the browser console**
This is expected and harmless. The frontend uses `mode: 'no-cors'`, which means the browser won't be able to read the response — but the request still reaches Apps Script successfully. The success state is shown optimistically after the fetch resolves. You can verify submissions landed by checking the Google Sheet directly.

**Apps Script returns a 403 or authorization error**
Make sure the Web App is deployed with **Anyone** access (not "Anyone with a Google account"). After changing this, you must create a **New deployment** — updating the existing one does not always pick up access changes.

**Submissions aren't appearing in the sheet**
- Confirm the `SHEET_ID` in `apps-script.js` matches the ID in your Google Sheet URL.
- Open Apps Script → **Executions** tab to see if `doPost` ran and whether it errored.
- Run `testClientSubmission()` or `testProviderSubmission()` manually from the Apps Script editor to confirm the script works independently of the frontend.

**Cloudflare DNS is blocking Amplify SSL**
Cloudflare's orange-cloud proxy intercepts SSL termination and conflicts with Amplify's certificate manager. Set the DNS record to **DNS only** (gray cloud icon in Cloudflare). Your SSL is handled by Amplify — you don't need Cloudflare to proxy it.

**CNAME vs A record**
Amplify provides a CNAME that points to an Amplify distribution. Use the CNAME in Cloudflare, not an A record. If you're using an apex domain (`pleaseheidi.com` without `www`), Amplify also supports apex domain mapping — follow the Amplify console instructions for your specific setup.

**Emails not arriving**
- Google Apps Script uses Gmail to send emails. The account running the script must have Gmail enabled.
- Check your Gmail Sent folder to confirm the script is sending.
- Check spam folders on the receiving end.
- If volume grows, consider upgrading to SendGrid or Postmark via UrlFetchApp — the script can be updated to support this.
