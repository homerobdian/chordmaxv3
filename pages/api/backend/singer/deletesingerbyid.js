import database from "../../../../database/database.js";
import Singer from "../../../../models/SingerModel.js";

export default async (req, res) => {
  database();
  const query = req.query.id;
  try {
    const deletesinger = await Singer.findByIdAndDelete(query);
    res.status(200).json(deletesinger);
  } catch (error) {
    res.status(404).json({ msg: "failed request" });
  }
};
