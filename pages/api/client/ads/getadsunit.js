import database from "../../../../database/database.js";
import Ads from "../../../../models/AdsModel.js";

export default async (req, res) => {
  database();
  try {
    const data = await Ads.findById("638218a6aef7c485166fa016");
    if (!data) {
      res.status(201).json({ msg: "data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ msg: "request error" });
  }
};
