import database from "../../../../database/database.js";
import Song from "../../../../models/SongModel.js";

export default async (req, res) => {
  database();
  try {
    const response = await Song.updateMany(
      {},
      {
        $set: { viewInToday: 0 },
      }
    );

    res.status(200).json({ msg: "succes reset" });
  } catch (error) {
    res.status(500).json({ msg: "request failed", error: error });
  }
};
