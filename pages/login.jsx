import Axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Layout from "../layouts";
import { useRouter } from "next/router";
import { Spinner } from "../components/spinners";

function Login() {
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const validateLogin = () => {
    if (!email) {
      setError("Please enter your email");
      return false;
    }
    if (!password) {
      setError("Please enter your password");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateLogin()) return;
    setLoading(true);

    try {
      const response = await Axios.post("/api/login", { email, password });
      if (response.data.status === "success") {
        router.replace("/user");
      } else {
        setError("Invalid login email/ password");
        setLoading(false);
      }
    } catch (error) {
      setError("Something went wrong while logging you in.. please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Layout>
        <div className="jumbotron text-center">
          <div className="container">
            <h1 className="display-4">Login</h1>
            <p className="lead">
              {router.query.name
                ? `Welcome to Pluva, ${router.query.name}! Login to your account.`
                : "Login to access all Pluva features!"}
            </p>

            <form onSubmit={handleLogin} className="mx-auto mt-5">
              {error && (
                <div className="alert alert-danger text-left">{error}</div>
              )}

              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {loading ? (
                <button
                  className="btn btn-success btn-block mt-5"
                  disabled={true}
                >
                  <Spinner /> Logging in...
                </button>
              ) : (
                <button className="btn btn-success btn-block mt-5">
                  Login
                </button>
              )}

              <style jsx>{`
                max-width: 500px;
              `}</style>
            </form>

            <p className="mt-5">
              <Link href="/signup">
                <a className="btn btn-outline-dark mr-2">Sign up</a>
              </Link>

              <Link href="/reset">
                <a className="btn btn-outline-dark">Recover password</a>
              </Link>
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Login;
