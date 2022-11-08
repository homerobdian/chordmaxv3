import database from "../../../../database/database.js";
import Singer from "../../../../models/SingerModel.js";

export default async (req, res) => {
  database();
  try {
    const data = await Singer.find({
      abjad: req.query.abjad,
    }).sort({ singerName: 1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: "request failed" });
  }
};
