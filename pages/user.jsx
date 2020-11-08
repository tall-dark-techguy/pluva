import Layout from "../layouts";
import pageSessionHandler from "../utils/pageSessionHandler";
import withSession from "../utils/withSession";

function User({ user }) {
  return (
    <>
      <Layout>
        <div className="jumbotron text-center">
          <h1 className="display-4">Hi {user?.name}!</h1>
          <p className="lead">Email: {user?.email}</p>
          <p className="lead">
            Congratulations! You're one of the few selected people that can see
            this protected page!
          </p>
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps = withSession(async ({ req, res }) => {
  return pageSessionHandler(req, res);
});

export default User;
