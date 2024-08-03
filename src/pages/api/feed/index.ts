import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), "public", "rss.xml");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error reading RSS file" });
    }

    res.setHeader("Content-Type", "application/rss+xml");
    res.setHeader("Cache-Control", "max-age=0, s-maxage=3600");
    res.status(200).send(data);
  });
}
