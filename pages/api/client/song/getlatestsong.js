import database from "../../../../database/database.js";
import Song from "../../../../models/SongModel.js";

export default async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  database();
  try {
    const response = await Song.find({}, { songLyric: 0 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ _id: -1 })
      .exec();
    const count = await Song.countDocuments();
    res.json({
      data: response,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(404).json("msg: request failed");
  }
};
