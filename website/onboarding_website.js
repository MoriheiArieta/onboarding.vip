import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const port = 3001;

const app = express();
app.use(express.static("public"));

app.get("/", (req, res) => {
  fs.readFile("index.html", "utf8", function read(err, content) {
    //content = content.replace(/#pageTitle#/g, page_title);

    res.send(content);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
