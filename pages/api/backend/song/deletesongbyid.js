import SongModel from "../../../../models/SongModel";
import database from "../../../../database/database.js";

export default async (req, res) => {
  const method = req.method;
  const query = req.query;
  if (method != "POST") {
    res.status(500).json({ msg: "method not allowed" });
  }
  database();
  if (!query) {
    res.status(500).json({ msg: "error query" });
  }
  try {
    const response = await SongModel.findByIdAndDelete(req.query.id);
    res.status(200).json(response);
  } catch (error) {
    res.status(402).json({ msg: "error request" });
  }
};
