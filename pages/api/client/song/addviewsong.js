import database from "../../../../database/database.js";
import Song from "../../../../models/SongModel.js";

export default async (req, res) => {
  database();
  try {
    const songid = await Song.findById(req.query.id);
    const addViews = await Song.findByIdAndUpdate(req.query.id, {
      views: songid.views + 2,
    });

    res.status(200).json(addViews);
  } catch (error) {
    res.status(500).json({ msg: "request failed", error: error });
  }
};
