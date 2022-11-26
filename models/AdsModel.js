import mongoose from "mongoose";
const { Schema } = mongoose;

const Ads = new Schema({
  admobBanner: String,
  admobInterstitial: String,
  admobRewards: String,
  admobNative: String,
  admobInAppOpen: String,
});

export default mongoose.models["Ads"] || mongoose.model("Ads", Ads);
