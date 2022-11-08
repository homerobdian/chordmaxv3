import database from "../../../../database/database.js";
import Song from "../../../../models/SongModel.js";
import Singer from "../../../../models/SingerModel.js";

export default async function (req, res) {
  database();

  try {
    const response = await Song.findOne({ slug: req.query.slug });
    if (response.lenght == 0) {
      res.status(404).json({
        code: 404,
        msg: "data not found",
      });
    }
    const singerslug = await Singer.findOne({ singerId: response.singerId });

    const dataRes = {
      _id: response._id,
      songId: response.songId,
      songName: response.songName,
      songLyric: response.songLyric,
      singerId: response.singerId,
      singerName: response.singerName,
      songLike: response.singerName,
      slug: response.slug,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
      singerSlug: singerslug.slug,
      views: response.views,
    };

    res.status(200).json(dataRes);
  } catch (error) {
    res.status(404).json({ code: 404, msg: "data not found" });
    console.log(error);
  }
}
