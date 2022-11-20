import SongModel from "../../../../models/SongModel";
import database from "../../../../database/database.js";

export default async (req, res) => {
  const method = req.method;
  if (method != "POST") {
    res.status(500).json({ msg: "failed method request" });
  }
  database();

  const songName = req.body.songName;
  const songLyric = req.body.songLyric;
  const singerId = req.body.singerId;
  const singerName = req.body.singerName;
  const slg = generateSlug(songName);
  const slug = slg + `-` + generateSlugId(4).toLowerCase();
  const keywords = `${singerName},${songName}`;
  const singerSlug = req.body.singerSlug;

  console.log(singerSlug);

  const body = {
    songName: songName,
    songLyric: songLyric,
    singerId: singerId,
    singerName: singerName,
    songLike: 0,
    slug: slug,
    views: 0,
    singerSlug: singerSlug,
    keywords: keywords,
  };

  try {
    const response = await SongModel.create(body);
    res.status(200).json(response);
  } catch (error) {
    res.status(401).json({ msg: "error saat menmabahkan lagu" });
  }
};

function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .replace(/\s+/g, "-")
    .replace(/\-\-+/g, "-")
    .replace(/[^\w\-]+/g, "");
}

function generateSlugId(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
