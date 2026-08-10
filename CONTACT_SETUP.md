# Contact Form Setup

This portfolio is now wired for a Google Apps Script backend that does two things on every contact form submission:

1. Sends an email notification to `aftab@aftabsipahi.com`
2. Appends the lead into a Google Sheet with an `Opportunity Status` column

## Google Sheet

Create a Google Sheet and keep one tab named `Leads`.

The Apps Script will create these columns automatically if the sheet is empty:

- `Lead ID`
- `Created At`
- `Name`
- `Email`
- `Phone`
- `Message`
- `Opportunity Status`
- `Source`
- `Page URL`
- `User Agent`

`Opportunity Status` is automatically set to `Open` and configured with a dropdown:

- `Open`
- `Working`
- `Qualified`
- `Closed Won`
- `Closed Lost`
- `On Hold`

## Apps Script

1. Open `script.google.com`
2. Create a new Apps Script project
3. Paste the content of [google-apps-script/contact-handler.gs](/Users/aftabsipahi/Downloads/Portfolio-Website-main/google-apps-script/contact-handler.gs:1)
4. Replace `PASTE_YOUR_GOOGLE_SHEET_ID_HERE` with your real Google Sheet ID
5. Save the script
6. Deploy it as a Web App

Recommended deployment:

- `Execute as`: `Me`
- `Who has access`: `Anyone`

After deployment, copy the Web App URL.

## Frontend config

Open [assets/js/contact-config.js](/Users/aftabsipahi/Downloads/Portfolio-Website-main/assets/js/contact-config.js:1) and set:

```js
window.PORTFOLIO_CONTACT_CONFIG = {
    appsScriptEndpoint: "YOUR_WEB_APP_URL_HERE",
    notificationEmail: "aftab@aftabsipahi.com",
    defaultOpportunityStatus: "Open",
    sourceLabel: "Portfolio Website"
};
```

## Test flow

1. Fill the `Get in Touch` form on the website
2. Submit the form
3. Confirm you receive an email at `aftab@aftabsipahi.com`
4. Confirm a new row appears in your Google Sheet with `Opportunity Status = Open`

If the form shows success but nothing lands in the sheet, check the Apps Script `Executions` tab for errors.
