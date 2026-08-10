const CONTACT_CONFIG = {
  spreadsheetId: "PASTE_YOUR_GOOGLE_SHEET_ID_HERE",
  sheetName: "Leads",
  notificationEmail: "aftab@aftabsipahi.com",
  defaultOpportunityStatus: "Open",
  allowedStatuses: ["Open", "Working", "Qualified", "Closed Won", "Closed Lost", "On Hold"]
};

const CONTACT_HEADERS = [
  "Lead ID",
  "Created At",
  "Name",
  "Email",
  "Phone",
  "Message",
  "Opportunity Status",
  "Source",
  "Page URL",
  "User Agent"
];

function doPost(e) {
  try {
    const payload = getPayload_(e);
    validatePayload_(payload);

    const sheet = getOrCreateSheet_();
    ensureSheetSetup_(sheet);

    const row = [
      Utilities.getUuid(),
      new Date(),
      payload.name,
      payload.email,
      payload.phone || "",
      payload.message,
      payload.opportunityStatus || CONTACT_CONFIG.defaultOpportunityStatus,
      payload.source || "Portfolio Website",
      payload.pageUrl || "",
      payload.userAgent || ""
    ];

    sheet.appendRow(row);
    sendNotificationEmail_(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getPayload_(e) {
  if (e && e.parameter && Object.keys(e.parameter).length > 0) {
    return e.parameter;
  }

  if (e && e.postData && e.postData.contents) {
    return JSON.parse(e.postData.contents);
  }

  throw new Error("No form payload received.");
}

function validatePayload_(payload) {
  if (!payload.name || !payload.email || !payload.message) {
    throw new Error("Name, email, and message are required.");
  }
}

function getOrCreateSheet_() {
  if (!CONTACT_CONFIG.spreadsheetId || CONTACT_CONFIG.spreadsheetId.indexOf("PASTE_") === 0) {
    throw new Error("Update CONTACT_CONFIG.spreadsheetId in contact-handler.gs.");
  }

  const spreadsheet = SpreadsheetApp.openById(CONTACT_CONFIG.spreadsheetId);
  return spreadsheet.getSheetByName(CONTACT_CONFIG.sheetName) || spreadsheet.insertSheet(CONTACT_CONFIG.sheetName);
}

function ensureSheetSetup_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(CONTACT_HEADERS);
    sheet.setFrozenRows(1);
  }

  const statusColumn = CONTACT_HEADERS.indexOf("Opportunity Status") + 1;
  const validation = SpreadsheetApp.newDataValidation()
    .requireValueInList(CONTACT_CONFIG.allowedStatuses, true)
    .setAllowInvalid(false)
    .build();

  sheet.getRange(2, statusColumn, Math.max(sheet.getMaxRows() - 1, 1), 1).setDataValidation(validation);
}

function sendNotificationEmail_(row) {
  const subject = "New portfolio inquiry from " + row[2];
  const body = [
    "A new inquiry was submitted from your portfolio website.",
    "",
    "Lead ID: " + row[0],
    "Created At: " + row[1],
    "Name: " + row[2],
    "Email: " + row[3],
    "Phone: " + row[4],
    "Opportunity Status: " + row[6],
    "Source: " + row[7],
    "Page URL: " + row[8],
    "",
    "Message:",
    row[5]
  ].join("\n");

  MailApp.sendEmail({
    to: CONTACT_CONFIG.notificationEmail,
    subject: subject,
    body: body,
    replyTo: row[3]
  });
}
