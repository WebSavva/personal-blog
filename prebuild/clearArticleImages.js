const fs = require("fs");
const path = require("path");

const rootDir = "./public/articles";

fs.readdir(rootDir, (err, directories) => {
  if (err) throw err;

  for (const dir of directories) {
    fs.rmSync(path.join(rootDir, dir), { recursive: true, force: true });
  }
});
