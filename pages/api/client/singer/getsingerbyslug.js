import database from "../../../../database/database.js";
import Singer from "../../../../models/SingerModel.js";

export default async function (req, res) {
  database();
  try {
    const data = await Singer.findOne({ slug: req.query.slug });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ msg: "request failed", error: error });
  }
}
