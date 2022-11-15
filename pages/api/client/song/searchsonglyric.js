import database from "../../../../database/database.js";
import Song from "../../../../models/SongModel.js";

export default async (req, res) => {
  database();
  const wordy = req.query.search;
  const query = '"' + wordy + '"';

  const pipeline = [
    {
      $search: {
        index: "songlyricindex",
        text: {
          query: query,
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
      },
    },
  ];

  try {
    const data = await Song.aggregate(pipeline);
    if (!data) {
      res.status(404).json({ msg: "data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ msg: "request failed" });
  }
};
