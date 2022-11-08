import database from "../../../../database/database.js";
import Singer from "../../../../models/SingerModel.js";

export default async (req, res) => {
  if (req.method != "POST") {
    res.status(404).json({ msg: "invalied request method" });
  }
  database();
  var arName = req.body.singerName;
  console.log(arName);
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
    const insert = await Singer.create(body);
    res.status(200).json(insert);
  } catch (error) {
    res.status(404).json({ msg: "failed post request" });
    console.log(error);
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
