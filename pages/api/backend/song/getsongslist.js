import database from "../../../../database/database.js";
import Song from "../../../../models/SongModel.js";

export default async (req, res) => {
  database();
  const { page = 1, limit = 100 } = req.query;
  try {
    const data = await Song.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ _id: -1 })
      .exec();
    const count = await Song.countDocuments();

    if (!data) {
      return res.status(404).json({ msg: "data tidak di temukan" });
    }
    res.json({
      data: data,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(404).json({ msg: "failed get data" });
    console.log(error);
  }
};
