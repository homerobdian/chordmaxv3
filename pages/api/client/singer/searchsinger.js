import database from "../../../../database/database.js";
import Singer from "../../../../models/SingerModel.js";

export default async (req, res) => {
  database();
  const wordy = req.query.search;
  const query = '"' + wordy + '"';

  const pipeline = [
    {
      $search: {
        index: "default",
        text: {
          query: query,
          path: {
            wildcard: "*",
          },
        },
      },
    },
    {
      $limit: 40,
    },
  ];

  try {
    const data = await Singer.aggregate(pipeline);
    if (!data) {
      res.status(404).json({ msg: "data not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ msg: "request failed" });
    console.log(error);
  }
};
