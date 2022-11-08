import database from "../../../../database/database.js";
import SingerModel from "../../../../models/SingerModel.js";

export default async (req, res) => {
  database();
  try {
    const response = await SingerModel.find();

    if (!response) {
      return res.status(404).json({ msg: "data tidak di temukan" });
    }
    res.json(response);
  } catch (error) {
    res.status(404).json({ msg: "error saat pengambilan data" });
  }
};
