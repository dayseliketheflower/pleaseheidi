var SHEET_ID = "1BTSX1TXUubxg1p3wZKiPJiZqp54OjjbmtLrE4hcj0-0";
var NOTIFY_EMAIL = "spg95m@protonmail.com";

function doPost(e) {
  try {
    var raw = "{}";
    if (e.postData && e.postData.contents) {
      raw = e.postData.contents;
    }
    var data = JSON.parse(raw);
    if (data.type === "client") {
      handleClient(data);
    } else if (data.type === "provider") {
      handleProvider(data);
    }
    return ContentService
      .createTextOutput(JSON.stringify({success: true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleClient(data) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName("Clients");
  var interests = "";
  if (Array.isArray(data.interests)) {
    interests = data.interests.join(", ");
  }
  sheet.appendRow([
    new Date(),
    data.firstName || "",
    data.email || "",
    data.city || "",
    data.referral || "",
    interests,
    data.notes || ""
  ]);
  var clientSubject = "You're on the Heidi waitlist";
  var clientBody = "Hi " + (data.firstName || "there") + ",\n\n"
    + "You're on the list! We'll be in touch when Heidi is live in "
    + (data.city || "your area") + ".\n\n"
    + "- The Heidi Team\n\n"
    + "Not therapy. Not dating. Not sexual services.";
  GmailApp.sendEmail(data.email, clientSubject, clientBody, {name: "Heidi"});

  var founderSubject = "New Client Signup - " + (data.firstName || "") + " from " + (data.city || "");
  var founderBody = "Name: " + (data.firstName || "") + "\n"
    + "Email: " + (data.email || "") + "\n"
    + "City: " + (data.city || "") + "\n"
    + "Referral: " + (data.referral || "") + "\n"
    + "Interests: " + interests + "\n"
    + "Notes: " + (data.notes || "");
  GmailApp.sendEmail(NOTIFY_EMAIL, founderSubject, founderBody, {name: "Heidi"});
}

function handleProvider(data) {
  var ss = SpreadsheetApp.openById(SHEET_ID);
  var sheet = ss.getSheetByName("Providers");
  var services = "";
  if (Array.isArray(data.services)) {
    services = data.services.join(", ");
  }
  sheet.appendRow([
    new Date(),
    data.firstName || "",
    data.lastName || "",
    data.email || "",
    data.phone || "",
    data.city || "",
    data.gender || "",
    data.orientation || "",
    data.age || "",
    data.motivation || "",
    services,
    "Yes"
  ]);
  var providerSubject = "Your Heidi provider application - next steps";
  var providerBody = "Hi " + (data.firstName || "there") + ",\n\n"
    + "Your application has been received.\n\n"
    + "Next steps:\n"
    + "1. Application Received (today)\n"
    + "2. Identity Verification (within 48 hours)\n"
    + "3. Background Check (3-5 business days)\n"
    + "4. Orientation and Training (~2 hours)\n"
    + "5. Profile Setup and Launch\n\n"
    + "Questions? providers@pleaseheidi.com\n\n"
    + "- The Heidi Team\n\n"
    + "Not therapy. Not dating. Not sexual services.";
  GmailApp.sendEmail(data.email, providerSubject, providerBody, {name: "Heidi Provider Team"});

  var founderSubject = "New Provider Application - " + (data.firstName || "") + " " + (data.lastName || "") + " from " + (data.city || "");
  var founderBody = "Name: " + (data.firstName || "") + " " + (data.lastName || "") + "\n"
    + "Email: " + (data.email || "") + "\n"
    + "Phone: " + (data.phone || "") + "\n"
    + "City: " + (data.city || "") + "\n"
    + "Age: " + (data.age || "") + "\n"
    + "Gender: " + (data.gender || "") + "\n"
    + "Orientation: " + (data.orientation || "") + "\n"
    + "Services: " + services + "\n"
    + "Motivation: " + (data.motivation || "");
  GmailApp.sendEmail(NOTIFY_EMAIL, founderSubject, founderBody, {name: "Heidi"});
}
