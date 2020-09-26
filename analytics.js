const fs = require('fs');
// This replaces the div tag in index.html with Google Analytics tag. Ideal way should be using the react app,
// but we just want the basic infographic of users.
const targetFile = "public/index.html";
const analyticsJs = process.env["ANALYTICS_JS"];
if (!analyticsJs) return;
let htmlFile = fs.readFileSync(targetFile, "utf8")
const htmlWithAnalytics = htmlFile.replace('<div id="analytics"></div>', analyticsJs);
fs.writeFileSync(targetFile, htmlWithAnalytics, "utf8")
