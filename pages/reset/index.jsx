import Axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Spinner } from "../../components/spinners";
import Layout from "../../layouts";

function Index() {
  const router = useRouter();

  const [email, setEmail] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleSendResetMail = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await Axios.post("/api/reset", { email });

      if (response.data.status === "success") {
        const { id, name, email } = response.data.data;
        router.push(`/reset/${id}?u=${name}&e=${email}`);
      } else {
        setError("Your email is not found in our records.");
        setLoading(false);
      }
    } catch (error) {
      setError(
        "Something went wrong while processing your request. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <>
      <Layout>
        <div className="jumbotron text-center bg-white">
          <h1 className="display-4">Reset password</h1>
          <p className="lead">Don't worry, we all forget sometimes.</p>

          <form onSubmit={handleSendResetMail} className="mx-auto mt-5">
            {error && (
              <div className="alert alert-danger text-left">{error}</div>
            )}

            <div className="input-group">
              <input
                type="email"
                className="form-control"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="input-group-append">
                {!loading ? (
                  <button className="btn btn-success">
                    Proceed <FaArrowRight />
                  </button>
                ) : (
                  <button className="btn btn-success" disabled>
                    <Spinner /> Please wait...
                  </button>
                )}
              </div>
            </div>

            <style jsx>{`
              max-width: 500px;
            `}</style>
          </form>
        </div>
      </Layout>
    </>
  );
}

export default Index;
