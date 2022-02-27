import { FC } from "react";

const steps = [
  {
    title: "Login With Zoom",
    description:
      "Login with your zoom account from then Login With Zoom Button",
  },
  {
    title: "Start Your Meeting",
    description: "Start your meeting from your zoom client",
  },
  {
    title: "Click on Select A Random Participant button",
    description:
      "Find your meeting in your dashboard and click on select a random participant",
  },
];

const Steps = () => {
  return (
    <div className="mx-auto max-w-7xl px-3 py-5 capitalize">
      <div className="mx-auto flex max-w-7xl flex-col px-3 pt-5 text-center">
        <h1 className="text-2xl font-semibold text-zinc-800">
          How To Get Started
        </h1>
        <h3 className="mt-1 text-xl text-zinc-500">
          Simply Get Started In 3 Steps
        </h3>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => (
          <SingleStep id={index + 1} {...step} />
        ))}
      </div>
    </div>
  );
};

interface SingleStepProps {
  id: number;
  title: string;
  description: string;
}

const SingleStep: FC<SingleStepProps> = ({ id, title, description }) => {
  return (
    <div className="rounded-md bg-white p-6 shadow-sm">
      <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
        <h3 className="text-xl font-bold text-gray-600">{id}</h3>
      </div>

      <h2 className="mb-3 text-xl font-semibold">{title}</h2>
      <p className="text-lg">{description}</p>
    </div>
  );
};

export default Steps;
