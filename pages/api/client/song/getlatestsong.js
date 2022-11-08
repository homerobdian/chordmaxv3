import database from "../../../../database/database.js";
import Song from "../../../../models/SongModel.js";

export default async (req, res) => {
  database();
  try {
    const response = await Song.find({}, { songLyric: 0 })
      .sort({ _id: -1 })
      .limit(10);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json("msg: request failed");
  }
};
