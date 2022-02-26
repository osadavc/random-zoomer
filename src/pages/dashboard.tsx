import type { GetServerSideProps, NextPage } from "next";
import { getToken, JWT } from "next-auth/jwt";
import Header from "../components/Common/Header";

interface DashboardProps {
  user: JWT;
}

const Dashboard: NextPage<DashboardProps> = ({ user }) => {
  return (
    <div>
      <Header user={user} />
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

export default Dashboard;
