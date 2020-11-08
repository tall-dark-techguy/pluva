import Axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Spinner } from "../components/spinners";
import Layout from "../layouts";

function Signup() {
  const router = useRouter();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const validateSignup = () => {
    if (!name) {
      setError("Please enter your name");
      return false;
    }
    if (!email) {
      setError("Please enter your email");
      return false;
    }
    if (!password) {
      setError("Please enter a password to secure your account");
      return false;
    }
    if (!confirmPassword) {
      setError("Please confirm your password");
      return false;
    }
    if (password !== confirmPassword) {
      setError(
        "Both passwords do not match each other. Please check and try again."
      );
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;
    setError("");
    setLoading(true);

    try {
      const response = await Axios.post("/api/signup", {
        name,
        email,
        password,
      });

      if (response.data.status === "success") {
        router.push(`/login?sign-in=new&name=${name}`);
      } else {
        setLoading(false);
        setError(
          "An account with this email address already exists! Please login if it's you or use another email instead."
        );
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Layout>
        <div className="jumbotron text-center">
          <div className="container">
            <h1 className="display-4">Sign up</h1>
            <p className="lead">
              Create an account to enjoy all the Pluva features!
            </p>

            <form onSubmit={handleSignup} className="mx-auto m-5">
              {error && (
                <div className="alert alert-danger text-left">{error}</div>
              )}

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

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

              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Retype password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {!loading ? (
                <button className="btn btn-success btn-block mt-5">
                  Sign up
                </button>
              ) : (
                <button className="btn btn-success btn-block mt-5" disabled>
                  <Spinner /> Creating account...
                </button>
              )}

              <p>By registering, you agree to our terms and conditions</p>

              <style jsx>{`
                max-width: 500px;
              `}</style>
            </form>

            <Link href="/login">
              <a className="btn btn-outline-dark">I already have account</a>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Signup;
