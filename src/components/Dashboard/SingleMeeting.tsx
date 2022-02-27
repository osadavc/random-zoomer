import { MeetingsI } from "../../models/User";
import { Dispatch, FC, SetStateAction } from "react";
import { API } from "../../service/API";
import { ChosenUser } from "../../pages/dashboard";
import ProgressBar from "@badrap/bar-of-progress";

interface SingleMeetingProps {
  meeting: MeetingsI;
  setChosenUser: Dispatch<SetStateAction<ChosenUser | null>>;
}

const SingleMeeting: FC<SingleMeetingProps> = ({
  meeting: {
    meetingId,
    isMeetingEnded,
    meetingName,
    participants,
    meetingUUID,
  },
  setChosenUser,
}) => {
  let participantsInTheMeeting = 0;
  const progress = new ProgressBar({
    size: 3,
    color: "#5282ef",
  });

  if (!isMeetingEnded) {
    participantsInTheMeeting = participants?.filter(
      (participant) => participant.isInTheMeeting == true
    ).length!;
  }

  const getRandomParticipant = async () => {
    progress.start();

    const {
      data: { result },
    } = await API.post("/meetings/random", { meetingUUID });

    setChosenUser({ ...result, meetingId });
    progress.finish();
  };

  return (
    <div
      className={`flex h-60 w-full flex-col justify-between rounded-md bg-gray-100 text-center md:h-80 ${
        isMeetingEnded && "select-none opacity-70"
      }`}
    >
      <div className="flex h-full flex-col justify-between p-5">
        <div className="space-y-3">
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
              Participant
              {participantsInTheMeeting > 1 ||
                (participantsInTheMeeting == 0 && "s")}{" "}
              {participantsInTheMeeting > 1 || participantsInTheMeeting == 0
                ? "Are"
                : "Is"}{" "}
              In The Meeting
            </div>
            {participantsInTheMeeting > 0 && (
              <button
                className="rounded-md bg-gray-300 py-1 px-2 font-semibold text-gray-800 ring-gray-300 ring-opacity-25 focus:ring"
                onClick={getRandomParticipant}
              >
                Select A Random Participant
              </button>
            )}
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
