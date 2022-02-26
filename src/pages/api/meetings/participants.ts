import { NextApiHandler } from "next";
import User from "../../../models/User";
import dbConnect from "../../../utils/dbConnect";

const { ZOOM_WEBHOOK_SECRET } = process.env;

const handler: NextApiHandler = async (req, res) => {
  if (req.headers.authorization != ZOOM_WEBHOOK_SECRET) {
    return res.status(401).end();
  }

  const {
    event,
    payload: {
      object: { participant, ...object },
    },
  } = req.body;

  try {
    await dbConnect();

    switch (event) {
      case "meeting.participant_joined": {
        const { host_id, uuid } = object;
        const { participant_user_id, user_name, user_id } = participant;

        if (host_id == participant_user_id) {
          console.log("HOST 😐");
          break;
        }

        const foundUser = await User.findOne({ zoomId: host_id });
        if (!foundUser) {
          throw new Error(`User with zoomId ${host_id} not found`);
        }

        const foundMeeting = foundUser.meetings.find(
          (meeting) => meeting.meetingUUID == uuid
        );
        if (!foundMeeting) {
          throw new Error(`Meeting with uuid ${uuid} not found`);
        }

        foundMeeting?.participants?.push({
          isInTheMeeting: true,
          userId: user_id,
          userName: user_name,
          userEmail: participant.email || "",
        });
        await foundUser.save();

        break;
      }
      case "meeting.participant_left": {
        const { host_id, uuid } = object;
        const { participant_user_id, user_id } = participant;

        if (host_id == participant_user_id) {
          console.log("HOST 😐");
          break;
        }

        const foundUser = await User.findOne({ zoomId: host_id });
        if (!foundUser) {
          throw new Error(`User with zoomId ${host_id} not found`);
        }

        const foundMeeting = foundUser.meetings.find(
          (meeting) => meeting.meetingUUID == uuid
        );
        if (!foundMeeting) {
          throw new Error(`Meeting with uuid ${uuid} not found`);
        }

        const foundParticipant = foundMeeting.participants?.find(
          (participant) => participant.userId == user_id
        );
        if (!foundParticipant) {
          throw new Error(`Participant with userId ${user_id} not found`);
        }

        foundParticipant.isInTheMeeting = false;

        break;
      }
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }

  res.status(200).end();
};

export default handler;
