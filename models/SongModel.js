import mongoose from "mongoose";

const Song = mongoose.Schema(
  {
    songId: Number,
    songName: String,
    songLyric: String,
    singerId: Number,
    singerName: String,
    songLike: Number,
    isPopular: Number,
    viewInWeek: Number,
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    singerSlug: String,
    views: Number,
    keywords: String,
  },
  { timestamps: true }
);

export default mongoose.models["Songs"] || mongoose.model("Songs", Song);
