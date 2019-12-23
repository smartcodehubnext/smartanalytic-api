const { google } = require("googleapis");
const apiKey = "AIzaSyBu2192g8DMLxyqqUjAAjUftAVRC0Z8kHQ";

const client_Id =
  "947832678194-dcii7ontasu96adh99df31a23cah03hj.apps.googleusercontent.com";
const clientSecret = "6srJIUfNhSE7OAbImSgbvUNx";
const prodRedirect = "https://www.smartanalytics.tech/redirect";
const devRedirect = "http://localhost:3000/redirect";

const oauth2Client = new google.auth.OAuth2(
  client_Id,
  clientSecret,
  prodRedirect
);
const scopes = ["https://www.googleapis.com/auth/analytics.readonly"];

const GetAuthUrl = () => {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes
  });
};

const GetRefreshToken = async code => {
  console.log(code);

  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
};
module.exports = { GetAuthUrl, GetRefreshToken };
