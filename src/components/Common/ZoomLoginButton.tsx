import { signIn } from "next-auth/react";

const ZoomLoginButton = () => {
  return (
    <button
      className="flex h-min items-center space-x-2 rounded-md bg-blue-400 py-2 px-3 font-semibold text-white focus:ring focus:ring-blue-400/30"
      onClick={() => {
        signIn("zoom", {
          callbackUrl: `${window.location.origin}/dashboard`,
        });
      }}
    >
      <img src="/images/zoom.svg" className="h-7 w-7" />
      <p className="mt-[0.125rem]">Login With Zoom</p>
    </button>
  );
};

export default ZoomLoginButton;
