import database from "../../../../database/database.js";
import Song from "../../../../models/SongModel.js";

export default async (req, res) => {
  const { songid, api_key } = req.query;
  if (!songid) {
    res.status(204).json({ msg: "empty Id" });
  }
  if (api_key != process.env.API_KEY) {
    res.status(403).json({ msg: "invalid key" });
  }
  database();
  try {
    const data = await Song.findById(songid);
    if (!data) {
      res.status(404).json({ msg: "data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "failed fetch data" });
  }
};
