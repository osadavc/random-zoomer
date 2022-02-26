import { MdSpaceDashboard } from "react-icons/md";
import Link from "next/link";

const GoToDashboard = () => {
  return (
    <Link href="/dashboard">
      <button className="flex h-min items-center space-x-2 rounded-md bg-blue-400 py-2 px-3 font-semibold text-white focus:ring focus:ring-blue-400/30">
        <MdSpaceDashboard className="text-xl" />
        <p className="mt-[0.125rem]">Go To Dashboard</p>
      </button>
    </Link>
  );
};

export default GoToDashboard;
