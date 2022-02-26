import { NextApiHandler } from "next";
import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";

const handler: NextApiHandler = async (req, res) => {
  try {
    await dbConnect();

    const createdUser = await User.findOneAndUpdate(
      {
        zoomId: req.body.id || req.body.sub,
      },
      {
        zoomId: req.body.id || req.body.sub,
        name: req.body.name,
        email: req.body.email,
        picture: req.body.image || req.body.picture,
      },
      { upsert: true, new: true }
    );

    res.status(200).json(createdUser);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
