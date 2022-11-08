export default async (req, res) => {
  res.status(500).json({ msg: "Unauthorized" });
};
