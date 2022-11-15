import argon2 from "argon2";
import database from "../../../../database/database.js";
import User from "../../../../models/UserModel.js";

export default async (req, res) => {
  database();
  const { fullname, email, password } = req.body;
  const hastPassword = await argon2.hash(password);
  try {
    const response = await User.findByIdAndUpdate("6362b164b345d8b855190e84", {
      name: fullname,
      email: email,
      password: hastPassword,
    });
    console.log(response);
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};
