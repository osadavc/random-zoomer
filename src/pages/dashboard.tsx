import type { GetServerSideProps, NextPage } from "next";
import { getToken, JWT } from "next-auth/jwt";
import Header from "../components/Common/Header";
import SingleMeeting from "../components/Dashboard/SingleMeeting";
import User, { MeetingsI } from "../models/User";
import dbConnect from "../utils/dbConnect";

interface DashboardProps {
  user: JWT;
  meetings: MeetingsI[];
}

const Dashboard: NextPage<DashboardProps> = ({ user, meetings }) => {
  return (
    <div>
      <Header user={user} />

      <div className="mx-auto max-w-7xl px-3 py-7">
        <h1 className="mb-5 text-2xl">Meetings In Your Account</h1>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
          {meetings.map((meeting) => (
            <SingleMeeting key={meeting._id} meeting={meeting} />
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
