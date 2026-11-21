const fs = require("fs");
const FOLDERS = ["Scripts", "Configs", "Others"];
const BIN = /\.(png|jpe?g|gif|webp|ico|bmp|zip|rar|7z|gz|tar|exe|dll|pdf|mp[34]|mov|avi|woff2?|ttf|otf)$/i;

const out = {};
for (const f of FOLDERS) {
  out[f] = fs.existsSync(f)
    ? fs.readdirSync(f, { withFileTypes: true })
        .filter(e => e.isFile() && !BIN.test(e.name))
        .map(e => e.name)
        .sort((a, b) => a.localeCompare(b))
    : [];
}
fs.writeFileSync("manifest.json", JSON.stringify(out, null, 2));
console.log("manifest.json 생성 완료:", out);
