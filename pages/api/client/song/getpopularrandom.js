import database from "../../../../database/database.js";
import Song from "../../../../models/SongModel.js";

export default async (req, res) => {
  database();

  try {
    const n = await Song.count({ isPopular: 1 });
    var r = Math.floor(Math.random() * n);
    const data = await Song.find({ isPopular: 1 }, { songLyric: 0 })
      .limit(10)
      .skip(r);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "request failed" });
  }
};
