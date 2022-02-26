import { useSession } from "next-auth/react";
import Link from "next/link";
import ZoomLoginButton from "./ZoomLoginButton";
import GoToDashboard from "./GoToDashboard";
import { useRouter } from "next/router";
import LogoutButton from "./LogoutButton";
import { JWT } from "next-auth/jwt";
import { FC } from "react";

interface HeaderProps {
  user: JWT;
}

const Header: FC<HeaderProps> = ({ user }) => {
  const router = useRouter();
  const isNotDashboard = router.pathname !== "/dashboard";

  return (
    <div className="bg-gray-100 font-nunito">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-3">
        <Link href="/">
          <div className="flex cursor-pointer items-center space-x-3">
            <img
              src="/images/random-zoomer-logo.png"
              className="h-12 w-12 overflow-hidden rounded-md"
            />
            <div className="hidden space-y-[0.15rem] sm:block">
              <h2 className="text-xl font-semibold leading-none text-zinc-900">
                Random
              </h2>
              <h2 className="text-lg leading-none">Zoomer</h2>
            </div>
          </div>
        </Link>
        {!user ? (
          <ZoomLoginButton />
        ) : isNotDashboard ? (
          <GoToDashboard />
        ) : (
          <LogoutButton />
        )}
      </div>
    </div>
  );
};

export default Header;
