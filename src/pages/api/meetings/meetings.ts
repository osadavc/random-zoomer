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
    payload: { object },
  } = req.body;

  try {
    dbConnect();

    switch (event) {
      case "meeting.started": {
        const {
          topic,
          id,
          uuid,
          host_id,
        }: {
          topic: string;
          id: string;
          uuid: string;
          host_id: string;
        } = object;

        const foundUser = await User.findOne({ zoomId: host_id });
        if (!foundUser) {
          throw new Error(`User with zoomId ${host_id} not found`);
        }

        const existingMeeting = foundUser.meetings.find(
          (meeting) => meeting.meetingUUID === uuid
        );

        if (existingMeeting) {
          throw new Error(
            `Meeting with uuid ${uuid} already exists for user ${host_id}`
          );
        }

        foundUser.meetings.push({
          meetingId: Number(id),
          meetingUUID: uuid,
          meetingName: topic,
          meetingStart: new Date(),
          isMeetingEnded: false,
        });
        await foundUser.save();

        break;
      }
      case "meeting.ended": {
        const { uuid, host_id } = object;

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
        foundMeeting.isMeetingEnded = true;
        await foundUser.save();

        break;
      }
    }

    res.status(200).end();
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export default handler;
