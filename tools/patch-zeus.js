import * as fs from "node:fs";

const paths = [
  "apps/client/src/app/zeus/index.ts",
  "apps/client/src/app/zeus/typedDocumentNode.ts",
];
for (const path of paths) {
  const data = fs.readFileSync(path).toString().split("\n");
  data.splice(0, 0, "// @ts-nocheck");
  const text = data.join("\n");
  fs.writeFile(path, text, "utf-8", (err) => {
    if (err) {
      throw err;
    }
    console.log(`Patched ${path} with @ts-nocheck.`);
  });
}
