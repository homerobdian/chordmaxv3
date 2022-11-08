import database from "../../../../database/database.js";
import Song from "../../../../models/SongModel";

export default async (req, res) => {
  database();

  const pipeline = [
    {
      $sample: { size: 10 },
    },
    {
      $sort: { views: -1 },
    },
    {
      $project: {
        // "_id": 0
        songLyric: 0,
        score: { $meta: "searchScore" },
      },
    },
  ];

  try {
    const data = await Song.aggregate(pipeline);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ msg: "request failed" });
  }
};
