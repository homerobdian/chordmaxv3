import mongoose from "mongoose";
const { Schema } = mongoose;
import slug from "mongoose-slug-generator";

mongoose.plugin(slug);

const Singer = new Schema(
  {
    singerId: {
      type: Number,
      default: Date.now,
    },
    singerName: String,
    abjad: String,
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models["Singers"] || mongoose.model("Singers", Singer);
