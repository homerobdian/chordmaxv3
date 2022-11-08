import database from "../../../../database/database.js";
import Song from "../../../../models/SongModel.js";

export default async (req, res) => {
  database();
  try {
    const data = await Song.findById(req.query.songid);
    if (!data) {
      res.status(404).json({ msg: "data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ msg: "failed fetch data" });
  }
};
