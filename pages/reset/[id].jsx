import Axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Spinner } from "../../components/spinners";
import Layout from "../../layouts";

function Reset() {
  const router = useRouter();
  const { id, u: name, e: email } = router.query;

  const [code, setCode] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [verified, setVerified] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!code) {
      setError("Reset code is invalid or has expired! Please retry.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await Axios.post(`/api/reset/verify?_id=${id}`, {
        code,
      });
      if (response.data.status === "success") {
        setVerified(true);
      } else {
        setError(
          "You entered an invalid reset code. Please check your email or try again."
        );
        setLoading(false);
        setVerified(false);
      }
    } catch (error) {
      setError(
        "Something went wrong while verifying your reset code. Please restart the process."
      );
      setLoading(false);
    }
  };

  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!password) {
      setError("Please enter a password");
      return;
    }
    if (!confirmPassword) {
      setError("Please retype and confirm your password");
      return;
    }
    if (password !== confirmPassword) {
      setError("The password you retyped does not match the first one.");
      return;
    }

    setLoading2(true);
    setError("");

    try {
      const response = await Axios.put(`/api/reset?id=${id}`, { password });
      if (response.data.status === "success") {
        router.push("/login");
      } else {
        setError("Password reset failed! Please restart the process again.");
        setLoading2(false);
      }
    } catch (error) {
      setError(
        "Something went wrong while resetting your password. Please try again."
      );
      setLoading2(false);
    }
  };

  return (
    <>
      <Layout>
        <div className="jumbotron bg-white text-center">
          <h1>Hi {name},</h1>
          {verified ? (
            <p className="lead">Alright, you can create a new password now</p>
          ) : (
            <p className="lead">
              We've sent a password reset code to your email ({email})
            </p>
          )}

          <div className="mt-5 mx-auto">
            {!verified ? (
              <form onSubmit={handleVerify}>
                {error && (
                  <div className="alert alert-danger text-left">{error}</div>
                )}

                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type reset code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <div className="input-group-append">
                    {!loading ? (
                      <button className="btn btn-success">
                        Verify <FaArrowRight />
                      </button>
                    ) : (
                      <button className="btn btn-success" disabled>
                        <Spinner /> Verifying, please wait...
                      </button>
                    )}
                  </div>
                </div>

                <p className="mt-5">
                  Didn't receive a code to your email,{" "}
                  <Link href="/reset">
                    <a>
                      <u>Resend code</u>
                    </a>
                  </Link>
                </p>
              </form>
            ) : (
              //   RESET PASSWORD
              <form onSubmit={handleResetPassword}>
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Retype password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                {!loading2 ? (
                  <button className="btn btn-success btn-block">
                    Reset password
                  </button>
                ) : (
                  <button className="btn btn-success btn-block" disabled={true}>
                    <Spinner /> Please wait, changing password...
                  </button>
                )}
              </form>
            )}

            <style jsx>{`
              max-width: 500px;
            `}</style>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Reset;
