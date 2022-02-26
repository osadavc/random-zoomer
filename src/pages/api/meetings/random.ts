import { NextApiHandler } from "next";
import { getToken } from "next-auth/jwt";
import dbConnect from "../../../utils/dbConnect";
import User from "../../../models/User";

const handler: NextApiHandler = async (req, res) => {
  try {
    const token = await getToken({ req });
    if (!token) {
      throw new Error("Not Authorized");
    }

    const { meetingUUID } = req.body;

    if (!meetingUUID) {
      throw new Error("No meetingUUID provided");
    }

    const foundMeeting = (
      await User.findOne({ zoomId: token.sub })
    )?.meetings.find((meeting) => meeting.meetingUUID === meetingUUID);

    if (foundMeeting?.isMeetingEnded) {
      throw new Error("Meeting has ended");
    }

    const participantList = foundMeeting?.participants;

    const participantsInTheMeeting = participantList?.filter(
      (participant) => participant.isInTheMeeting == true
    ).length!;

    const randomChosenParticipant =
      participantList?.[Math.floor(Math.random() * participantsInTheMeeting)];

    res.status(200).json({
      status: 200,
      result: randomChosenParticipant,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export default handler;
