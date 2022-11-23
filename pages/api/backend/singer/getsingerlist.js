import database from "../../../../database/database.js";
import Singer from "../../../../models/SingerModel.js";

export default async function (req, res) {
  database();

  const { page = 1, limit = 100 } = req.query;

  try {
    const response = await Singer.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ _id: -1 })
      .exec();

    const count = await Singer.countDocuments();

    if (!response) {
      return res.status(404).json({ msg: "data tidak di temukan" });
    }
    res.json({
      data: response,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(404).json({ msg: "error saat pengambilan data" });
  }
}
