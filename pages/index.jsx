import Link from "next/link";
import Layout from "../layouts";
import useUser from "../utils/useUser";

function Index() {
  const { user } = useUser();

  return (
    <>
      <Layout>
        <div className="jumbotron bg-white text-center">
          <div className="container">
            <p className="lead">
              Hello {user?.isLoggedIn ? user?.name : "Stranger"}, welcome to
            </p>
            <hr />
            <h1 className="display-4">Pluva</h1>
            <hr />
            <p className="lead">
              React, NextJS and Bootstrap 4 quick starter project with
              Authentication.
            </p>

            <p className="p-5">
              {!user?.isLoggedIn ? (
                <>
                  <Link href="/signup">
                    <a className="btn btn-success btn-lg mr-2">Get started</a>
                  </Link>

                  <Link href="/login">
                    <a className="btn btn-outline-dark btn-lg">Login</a>
                  </Link>
                </>
              ) : (
                <Link href="/user">
                  <a className="btn btn-outline-success btn-lg">Your account</a>
                </Link>
              )}
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Index;
