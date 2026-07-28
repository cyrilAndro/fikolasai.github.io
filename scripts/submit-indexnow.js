const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const host = "fikolasai.com";
const key = "be1cf52965f8465ea81c5933f57871dc";
const keyLocation = `https://${host}/${key}.txt`;
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const urlList = [...sitemap.matchAll(/<loc>(https:\/\/fikolasai\.com\/[^<]*)<\/loc>/g)].map((match) => match[1]);

if (!urlList.length) {
  throw new Error("Aucune URL trouvée dans sitemap.xml.");
}

const body = { host, key, keyLocation, urlList };

fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
}).then(async (response) => {
  const text = await response.text();
  if (![200, 202].includes(response.status)) {
    throw new Error(`IndexNow ${response.status}: ${text}`);
  }
  console.log(JSON.stringify({
    status: response.status,
    submitted: urlList.length,
    keyLocation,
  }, null, 2));
}).catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
