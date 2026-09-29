/**
 * =========================================================================
 * THIRAN TEAM CONNECT 2026 — GOOGLE APPS SCRIPT BACKEND
 * =========================================================================
 * 
 * Instructions to deploy:
 * 1. Open Google Sheets (create a new blank spreadsheet, e.g. "Thiran Team Connect 2026 Data")
 * 2. In the top menu, go to: Extensions > Apps Script
 * 3. Delete any existing code in Code.gs and paste this entire code
 * 4. Click "Save" (disk icon)
 * 5. Click "Deploy" > "New deployment"
 * 6. Under "Select type" (gear icon), select "Web app"
 * 7. Set:
 *    - Description: Thiran Live Data API
 *    - Execute as: Me (your Google account)
 *    - Who has access: Anyone
 *    - Click "Deploy", Authorize access when prompted
 * 8. Copy the generated "Web App URL" (e.g. https://script.google.com/macros/s/.../exec)
 * 9. Paste that URL into js/main.js -> const GOOGLE_SCRIPT_API_URL = "YOUR_URL_HERE";
 * =========================================================================
 */

function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var rsvpsSheet = getOrCreateSheet(ss, "RSVPs", ["Name", "Department", "Diet", "Note", "Timestamp"]);
  var nominationsSheet = getOrCreateSheet(ss, "Nominations", ["Nominator", "Nominee", "Category", "Reason", "Timestamp"]);
  var cheersSheet = getOrCreateSheet(ss, "Cheers", ["ID", "Author", "Recipient", "Tag", "Message", "Time"]);
  var ideasSheet = getOrCreateSheet(ss, "Ideas", ["ID", "Title", "Category", "Body", "Author", "Time"]);

  var rsvps = getRowsAsObjects(rsvpsSheet, ["name", "department", "diet", "note", "registeredAt"]);
  var nominations = getRowsAsObjects(nominationsSheet, ["nominator", "nominee", "category", "reason", "timestamp"]);
  var cheers = getRowsAsObjects(cheersSheet, ["id", "author", "recipient", "tag", "message", "time"]);
  var ideas = getRowsAsObjects(ideasSheet, ["id", "title", "category", "body", "author", "time"]);

  var output = {
    status: "success",
    rsvps: rsvps,
    nominations: nominations,
    cheers: cheers,
    ideas: ideas
  };

  return ContentService.createTextOutput(JSON.stringify(output))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var contents = JSON.parse(e.postData.contents);
    var type = contents.type;
    var data = contents.data;
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (type === "rsvp") {
      var sheet = getOrCreateSheet(ss, "RSVPs", ["Name", "Department", "Diet", "Note", "Timestamp"]);
      sheet.appendRow([data.name, data.department, data.diet, data.note, data.registeredAt]);
    } else if (type === "nomination") {
      var sheet = getOrCreateSheet(ss, "Nominations", ["Nominator", "Nominee", "Category", "Reason", "Timestamp"]);
      sheet.appendRow([data.nominator, data.nominee, data.category, data.reason, data.timestamp]);
    } else if (type === "cheer") {
      var sheet = getOrCreateSheet(ss, "Cheers", ["ID", "Author", "Recipient", "Tag", "Message", "Time"]);
      sheet.appendRow([data.id, data.author, data.recipient, data.tag, data.message, data.time]);
    } else if (type === "idea") {
      var sheet = getOrCreateSheet(ss, "Ideas", ["ID", "Title", "Category", "Body", "Author", "Time"]);
      sheet.appendRow([data.id, data.title, data.category, data.body, data.author, data.time]);
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSheet(ss, sheetName, headers) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(headers);
  }
  return sheet;
}

function getRowsAsObjects(sheet, keys) {
  var data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];
  var results = [];
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var obj = {};
    for (var k = 0; k < keys.length; k++) {
      obj[keys[k]] = row[k];
    }
    results.push(obj);
  }
  return results;
}
