import database from "../../../../database/database.js";
import Song from "../../../../models/SongModel.js";

export default async (req, res) => {
  database();
  try {
    const data = await Song.find(
      {
        singerId: req.query.id,
      },
      { songLyric: 0 }
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ msg: "request failed" });
  }
};
