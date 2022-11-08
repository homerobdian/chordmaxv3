import database from "../../../../database/database.js";
import Song from "../../../../models/SongModel.js";

export default async (req, res) => {
  database();
  try {
    const response = await Song.find({}, { slug: 1, singerSlug: 1 });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "request failed" });
  }
};
