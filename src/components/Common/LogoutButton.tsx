import { HiOutlineLogout } from "react-icons/hi";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button
      className="flex h-min items-center space-x-2 rounded-md bg-blue-400 py-2 px-3 font-semibold text-white focus:ring focus:ring-blue-400/30"
      onClick={() => {
        signOut({
          callbackUrl: "/",
        });
      }}
    >
      <HiOutlineLogout className="text-xl" />
      <p>Logout</p>
    </button>
  );
};

export default LogoutButton;
