import database from "../../../../database/database.js";
import Singer from "../../../../models/SingerModel";

export default async (req, res) => {
  database();
  try {
    const response = await Singer.find({}, { slug: 1 });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: "request failed" });
  }
};
