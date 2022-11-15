import database from "../../../../database/database.js";
import Song from "../../../../models/SongModel.js";

export default async (req, res) => {
  database();
  const querySingerName = req.query.singername;
  try {
    const data = await Song.find(
      {
        singerId: req.query.id,
      },
      { songLyric: 0 }
    );

    const data2 = await Song.find(
      {
        $or: [
          {
            singerName: {
              $regex: ".*" + querySingerName + ".*",
              $options: "i",
            },
          },
          {
            songName: { $regex: ".*" + querySingerName + ".*", $options: "i" },
          },
        ],
      },
      { songLyric: 0 }
    ).sort({ songName: 1 });

    res.status(200).json(data2);
    console.log(data2.length);
  } catch (error) {
    res.status(404).json({ msg: "request failed" });
  }
};
