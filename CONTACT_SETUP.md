# Contact Form Setup

This portfolio now uses a Google Form for the `Get in Touch` section.

Flow:

1. Visitor fills the Google Form embedded on the website
2. Google Forms stores the response directly in a linked Google Sheet
3. You manage lead progress in that sheet using an `Opportunity Status` column
4. Google Forms can notify you for new responses

## What to configure

Open [assets/js/contact-config.js](/Users/aftabsipahi/Downloads/Portfolio-Website-main/assets/js/contact-config.js:1) and set:

```js
window.PORTFOLIO_CONTACT_CONFIG = {
    googleFormEmbedUrl: "YOUR_GOOGLE_FORM_EMBED_URL",
    googleFormViewUrl: "YOUR_GOOGLE_FORM_VIEW_URL"
};
```

Example:

```txt
googleFormEmbedUrl: "https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true"
googleFormViewUrl: "https://docs.google.com/forms/d/e/FORM_ID/viewform"
```

## Google Form setup

1. Create a Google Form with fields for:
   - Name
   - Email
   - Phone
   - Message
2. In Google Forms, open `Responses`
3. Link responses to a Google Sheet
4. In that Google Sheet, add a manual column named `Opportunity Status`
5. Use values like:
   - `Open`
   - `Working`
   - `Qualified`
   - `Closed Won`
   - `Closed Lost`
   - `On Hold`

## Email notifications

In Google Forms:

1. Open the form
2. Go to `Responses`
3. Click the three-dot menu
4. Enable email notifications for new responses

## Notes

- This is simpler than Apps Script or a serverless backend
- Responses are stored directly in Google Sheets
- No API deployment is required
- The website no longer handles form submission itself
