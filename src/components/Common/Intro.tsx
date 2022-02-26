import { JWT } from "next-auth/jwt";
import { FC } from "react";
import ZoomLoginButton from "./ZoomLoginButton";

interface IntroProps {
  user: JWT;
}

const Intro: FC<IntroProps> = ({ user }) => {
  return (
    <div>
      <div className="mx-auto flex max-w-7xl flex-col px-3 py-5 text-center">
        <h1 className="text-2xl font-semibold text-zinc-800">
          Select A Random Participant From Your Zoom Meeting
        </h1>
        <h3 className="mt-1 text-xl text-zinc-500">Justice Prioritized 😉</h3>
        <div className="mt-5 flex justify-center">
          {!user ? <ZoomLoginButton /> : null}
        </div>
      </div>
    </div>
  );
};

export default Intro;
