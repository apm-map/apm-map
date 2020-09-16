// adapted from: http://codingfundas.com/how-to-read-edit-google-sheets-using-node-js/index.html

const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets.readonly"];
const sheets = google.sheets("v4");

async function getAuthToken() {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
    projectId: process.env.GCLOUD_PROJECT,
    credentials: {
      client_email: process.env.GCLOUD_CLIENT_EMAIL,
      private_key: process.env.GCLOUD_PRIVATE_KEY.split("\\n").join("\n"),
    },
  });
  const authToken = await auth.getClient();
  return authToken;
}

async function getSpreadsheet({ spreadsheetId, auth, sheetName }) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    auth,
    range: sheetName,
  });
  return res;
}

// Helper function that encapsulates pulling data via the Google Sheets API,
// sanitizing the data (empty strings -> null and tags comma-separated string -> array,
// and transforming the resulting data into an array of objects (instead of nested arrays)
async function getRows() {
  // 1. Pull data from Google Sheets
  const spreadsheetID = process.env.SPREADSHEET_ID;
  const auth = await getAuthToken();
  const response = await getSpreadsheet({
    spreadsheetId: spreadsheetID,
    auth: auth,
    sheetName: "PM Recruiting Resources",
  });

  // 2. Transform Google Sheets API response into array of objects
  const values = response.data.values;
  let rows = [];
  for (var i = 1; i < values.length; i++) {
    var rowObject = {};
    for (var j = 0; j < values[i].length; j++) {
      var value = values[i][j].length === 0 ? null : values[i][j];
      rowObject[values[0][j]] = value;
    }

    // split comma-separated tags into an array if non-null
    rowObject.tags = rowObject.tags
      ? rowObject.tags.split(",")
      : rowObject.tags;

    rows.push(rowObject);
  }

  return rows;
}

module.exports = {
  getRows,
};
