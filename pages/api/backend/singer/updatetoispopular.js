import database from "../../../../database/database.js";
import Singer from "../../../../models/SingerModel.js";

export default async (req, res) => {
  const method = req.method;
  //   if (method != "POST") {
  //     res.status(500).json({ msg: "failed method request" });
  //   }
  database();
  try {
    const data = await Singer.findByIdAndUpdate(req.query.id, {
      isPopular: 1,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(501).json({ msg: "Server error" });
  }
};
