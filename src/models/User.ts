import mongoose from "mongoose";

interface UserI extends mongoose.Document {
  zoomId: string;
  name: string;
  email: string;
  picture: string;
  meetings: MeetingsI[];
}

export interface MeetingsI {
  _id?: string;
  meetingId: number;
  meetingUUID: string;
  meetingName: string;
  meetingStart: Date;
  isMeetingEnded: boolean;
  participants?: ParticipantI[];
  lastRandomParticipantId?: string;
}

export interface ParticipantI {
  userId: string;
  userName?: string;
  userEmail?: string;
  isInTheMeeting: boolean;
}

const userSchema = new mongoose.Schema<UserI>({
  zoomId: { type: String, required: true },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  meetings: [
    {
      meetingId: { type: String, required: true },
      meetingUUID: { type: String, required: true },
      meetingName: { type: String, required: true },
      meetingStart: { type: Date, required: true },
      isMeetingEnded: { type: Boolean, required: true },
      lastRandomParticipantId: { type: String, required: false },
      participants: [
        {
          userId: { type: String, required: true },
          userName: { type: String, required: true },
          userEmail: { type: String, required: false },
          isInTheMeeting: { type: Boolean, required: true },
        },
      ],
    },
  ],
});

export default (mongoose.models.User as mongoose.Model<UserI>) ||
  mongoose.model<UserI>("User", userSchema);
