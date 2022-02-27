import { NextApiHandler } from "next";
import { getToken } from "next-auth/jwt";
import dbConnect from "../../../utils/dbConnect";
import User, { ParticipantI } from "../../../models/User";

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

    const foundUser = await User.findOne({ zoomId: token.sub });
    const foundMeeting = foundUser?.meetings.find(
      (meeting) => meeting.meetingUUID === meetingUUID
    );

    if (foundMeeting?.isMeetingEnded) {
      throw new Error("Meeting has ended");
    }

    const participantList = foundMeeting?.participants;

    const participantsInTheMeeting = participantList?.filter(
      (participant) => participant.isInTheMeeting == true
    ).length!;

    const randomChosenParticipant = getRandomUser(
      participantList!,
      participantsInTheMeeting,
      foundMeeting?.lastRandomParticipantId!
    );

    foundMeeting!.lastRandomParticipantId = randomChosenParticipant?.userId;
    await foundUser?.save();

    console.log(randomChosenParticipant);

    res.status(200).json({
      status: 200,
      result: randomChosenParticipant,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const getRandomUser = (
  participants: ParticipantI[],
  participantsInTheMeeting: number,
  previousId: string
): ParticipantI => {
  const randomChosenParticipant =
    participants?.[Math.floor(Math.random() * participantsInTheMeeting)];

  if (participantsInTheMeeting === 1) {
    return randomChosenParticipant;
  }

  if (randomChosenParticipant?.userId == previousId) {
    return getRandomUser(participants, participantsInTheMeeting, previousId);
  } else {
    return randomChosenParticipant;
  }
};

export default handler;
