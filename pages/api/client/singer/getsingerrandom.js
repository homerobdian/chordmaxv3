import database from "../../../../database/database.js";
import Singer from "../../../../models/SingerModel.js";

export default async (req, res) => {
  database();

  try {
    const n = await Singer.count({ isPopular: 1 });
    var r = Math.floor(Math.random() * n);
    const data = await Singer.find({ isPopular: 1 }).limit(10).skip(r);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "request failed" });
  }
};
