import * as fs from "node:fs";

const paths = ["node_modules/apollo-angular/package.json"];
for (const path of paths) {
  const data = fs.readFileSync(path).toString();
  const noModule = data.replace('"type": "module",', "");
  fs.writeFile(path, noModule, "utf-8", (err) => {
    if (err) {
      throw err;
    }
    console.log(`Patched ${path}`);
  });
}
