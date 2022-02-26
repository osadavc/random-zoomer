import type { GetServerSideProps, NextPage } from "next";
import { getToken, JWT } from "next-auth/jwt";
import Header from "../components/Common/Header";
import SingleMeeting from "../components/Dashboard/SingleMeeting";
import User, { MeetingsI, ParticipantI } from "../models/User";
import dbConnect from "../utils/dbConnect";
import { Dialog } from "@headlessui/react";
import { useState } from "react";

interface DashboardProps {
  user: JWT;
  meetings: MeetingsI[];
}

export interface ChosenUser extends ParticipantI {
  meetingID: string;
}

const Dashboard: NextPage<DashboardProps> = ({ user, meetings }) => {
  const [chosenUser, setChosenUser] = useState<ChosenUser | null>(null);

  return (
    <div>
      <Header user={user} />

      <Dialog
        open={!!chosenUser}
        onClose={() => setChosenUser(null)}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex min-h-screen items-center justify-center text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          <div className="relative mx-auto max-w-md rounded-md bg-white p-6">
            <Dialog.Title className="mb-5 text-lg font-semibold leading-9 text-zinc-800">
              A Random Participant From Meeting ID{" "}
              <span className="ml-1 rounded-md bg-gray-200 p-1 font-bold text-zinc-700">
                {chosenUser?.meetingID}
              </span>
            </Dialog.Title>

            <div>
              <h3 className="mb-3 text-2xl">Chosen User 🚀</h3>

              <div className="space-y-3 rounded-md bg-zinc-100 py-2">
                <h4>
                  User ID:{" "}
                  <span className="ml-2 rounded-md bg-zinc-200 px-1 py-[0.15rem] font-bold text-zinc-700">
                    {chosenUser?.userId}
                  </span>
                </h4>
                <h4>
                  User's Name :{" "}
                  <span className="ml-2 rounded-md bg-zinc-200 px-1 py-[0.15rem] font-bold text-zinc-700">
                    {chosenUser?.userName}
                  </span>
                </h4>
                <h4>
                  User's Email :{" "}
                  <span className="ml-2 rounded-md bg-zinc-200 px-1 py-[0.15rem] font-bold text-zinc-700">
                    {chosenUser?.userEmail}
                  </span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </Dialog>

      <div className="mx-auto max-w-7xl px-3 py-7">
        <h1 className="mb-5 text-2xl">Meetings In Your Account</h1>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
          {meetings.map((meeting) => (
            <SingleMeeting
              key={meeting._id}
              meeting={meeting}
              setChosenUser={setChosenUser}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const token = await getToken({
      req: ctx.req,
    });

    if (!token) {
      return {
        props: {},
        redirect: {
          destination: "/",
        },
      };
    }

    await dbConnect();
    const foundUser = await User.findOne({ zoomId: token.sub });
    const sortedMeetings = foundUser?.meetings.sort(
      (a, b) => Number(a.isMeetingEnded > b.isMeetingEnded) * 2 - 1
    );

    return {
      props: {
        user: token,
        meetings: JSON.parse(JSON.stringify(sortedMeetings)) ?? [],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};

export default Dashboard;
