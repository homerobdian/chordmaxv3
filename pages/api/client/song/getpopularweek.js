import database from "../../../../database/database.js";
import Song from "../../../../models/SongModel.js";

export default async (req, res) => {
  database();

  try {
    const data = await Song.find({}, { songLyric: 0 })
      .sort({ viewInWeek: -1 })
      .limit(10);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "request failed" });
  }
};
