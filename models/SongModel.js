import mongoose from "mongoose";

const Song = mongoose.Schema(
  {
    songId: Number,
    songName: String,
    songLyric: String,
    singerId: Number,
    singerName: String,
    songLike: Number,
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    singerSlug: String,
    views: Number,
  },
  { timestamps: true }
);

export default mongoose.models["Songs"] || mongoose.model("Songs", Song);
