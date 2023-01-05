import SingerModel from "../../../../models/SingerModel.js";
import database from "../../../../database/database.js";

export default async (req, res) => {
  database();

  const data = await SingerModel.findOne({ singerName: req.body.singerName });

  if (data == null) {
    res.status(404).json({ message: "Not Found" });
  }

  res.status(200).json(data);
};
