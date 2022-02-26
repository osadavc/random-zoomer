import { MeetingsI } from "../../models/User";
import { FC } from "react";

interface SingleMeetingProps {
  meeting: MeetingsI;
}

const SingleMeeting: FC<SingleMeetingProps> = ({
  meeting: { meetingId, isMeetingEnded, meetingName, participants },
}) => {
  let participantsInTheMeeting = 0;

  if (!isMeetingEnded) {
    participantsInTheMeeting = participants?.filter(
      (participant) => participant.isInTheMeeting == true
    ).length!;
  }

  return (
    <div
      className={`flex h-80 w-full flex-col justify-between rounded-md bg-gray-100 text-center ${
        isMeetingEnded && "select-none opacity-80"
      }`}
    >
      <div className="flex h-full flex-col justify-between p-5">
        <div className="space-y-2">
          <h3>
            Meeting ID:{" "}
            <span className="ml-1 rounded-md bg-gray-200 p-1 font-semibold text-zinc-700">
              {meetingId}
            </span>
          </h3>
          <h3>
            Meeting Topic:{" "}
            <span className="ml-1 font-semibold text-zinc-700">
              {meetingName}
            </span>
          </h3>
        </div>

        {!isMeetingEnded && (
          <>
            <div>
              <span className="font-semibold text-zinc-700">
                {participantsInTheMeeting}
              </span>{" "}
              Participants Are In The Meeting
            </div>
            <button className="rounded-md bg-gray-300 py-1 px-2 font-semibold text-gray-800 ring-gray-300 ring-opacity-25 focus:ring">
              Select A Random Participant
            </button>
          </>
        )}
      </div>
      <div
        className={`${
          isMeetingEnded ? "bg-red-500" : "bg-green-500"
        } cursor-pointer rounded-b-md py-1 text-center text-white`}
      >
        {isMeetingEnded ? "Meeting Is Ended" : "Meeting Is In Progress"}
      </div>
    </div>
  );
};

export default SingleMeeting;
