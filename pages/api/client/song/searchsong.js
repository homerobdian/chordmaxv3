import database from "../../../../database/database.js";
import Song from "../../../../models/SongModel.js";

export default async (req, res) => {
  database();
  const wordy = req.query.search;

  const pipeline = [
    {
      $search: {
        index: "default",
        text: {
          query: wordy,
          path: {
            wildcard: "*",
          },
        },
      },
    },
    {
      $limit: 100,
    },
    {
      $project: {
        songLyric: 0,
        score: { $meta: "searchScore" },
      },
    },
  ];

  try {
    const data = await Song.aggregate(pipeline);
    if (!data) {
      res.status(404).json({ msg: "data not found" });
    }
    console.log(data.length);

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ msg: "request failed" });
    console.log(error);
  }
};
