import SongModel from "../../../../models/SongModel.js";
import database from "../../../../database/database.js";
import SingerModel from "../../../../models/SingerModel.js";

export default async (req, res) => {
  var sinId = "";
  var sinName = "";
  var sinSlug = "";
  const method = req.method;
  if (method != "POST") {
    res.status(500).json({ msg: "failed method request" });
  }

  database();

  const getSinger = await SingerModel.findOne({
    singerName: req.body.singerName,
  });

  //Check Singer
  if (getSinger == null) {
    var arName = req.body.singerName;
    var abd = arName.substring(0, 1).toUpperCase();
    var slg = generateSlug(req.body.singerName);
    var slugg = slg + "-" + generateSlugId(4).toLowerCase();
    var body = {
      singerName: arName,
      singerId: Date.now(),
      abjad: abd,
      slug: slugg,
    };

    try {
      const insert = await SingerModel.create(body);
      sinId = insert.singerId;
      sinName = insert.singerName;
      sinSlug = insert.slug;
    } catch (error) {
      res.status(404).json({ msg: "failed post request" });
      console.log(error);
    }
  } else {
    sinId = getSinger.singerId;
    sinName = getSinger.singerName;
    sinSlug = getSinger.slug;
  }

  const songName = req.body.songName;
  const songLyric = req.body.songLyric;
  const singerId = sinId;
  const singerName = sinName;
  const slgs = generateSlug(songName);
  const slug = slgs + `-` + generateSlugId(4).toLowerCase();
  const keywords = `${singerName},${songName}`;
  const singerSlug = sinSlug;

  const bodySong = {
    songName: songName,
    songLyric: songLyric,
    singerId: singerId,
    singerName: singerName,
    songLike: 0,
    slug: slug,
    views: 0,
    singerSlug: singerSlug,
    keywords: keywords,
    isPopular: 0,
    viewInWeek: 0,
    viewInToday: 0,
  };

  try {
    const response = await SongModel.create(bodySong);
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
