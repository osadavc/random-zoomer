import { JWT } from "next-auth/jwt";
import { FC } from "react";
import GoToDashboard from "../Common/GoToDashboard";
import ZoomLoginButton from "../Common/ZoomLoginButton";

interface IntroProps {
  user: JWT;
}

const Intro: FC<IntroProps> = ({ user }) => {
  return (
    <div className="mx-auto max-w-7xl px-3">
      <div className="mx-auto flex max-w-7xl flex-col px-3 pt-5 text-center">
        <h1 className="text-2xl font-semibold text-zinc-800">
          Select A Random Participant From Your Zoom Meeting
        </h1>
        <h3 className="mt-1 text-xl text-zinc-500">Justice Prioritized 😉</h3>
        <div className="mt-4 flex justify-center">
          {!user ? <ZoomLoginButton /> : <GoToDashboard />}
        </div>
      </div>

      <div className="relative mt-10 w-full overflow-hidden rounded-lg border border-zinc-200">
        <img
          src="/images/screenshot.png"
          className="h-[400px] w-full rounded-lg object-cover object-top shadow-sm shadow-zinc-100/20 md:h-[600px]"
        />
      </div>
    </div>
  );
};

export default Intro;
