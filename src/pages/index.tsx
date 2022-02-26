import type { GetServerSideProps, NextPage } from "next";
import { getToken, JWT } from "next-auth/jwt";
import Header from "../components/Common/Header";
import Intro from "../components/Common/Intro";

interface DashboardProps {
  user: JWT;
}

const Home: NextPage<DashboardProps> = ({ user }) => {
  return (
    <div className="w min-h-screen bg-zinc-50 font-nunito">
      <Header user={user} />
      <Intro user={user} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const token = await getToken({
      req: ctx.req,
    });

    return {
      props: { user: token },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};

export default Home;
