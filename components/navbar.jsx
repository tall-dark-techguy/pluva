import Axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaBars, FaGithub, FaTimes, FaUser } from "react-icons/fa";
import { NavItem } from "../components/nav";
import useUser from "../utils/useUser";
import { SideNavOverlay } from "./sidenav";

function Navbar() {
  const router = useRouter();
  const { user } = useUser();

  const [sidenav, setSidenav] = useState(false);
  const sideNavWidth = sidenav ? "w-75" : "";

  const handleLogout = async () => {
    try {
      const response = await Axios.delete("/api/login");
      if (response.data.status === "success") {
        router.replace("/login");
      } else {
        alert("Unable to logout.");
      }
    } catch (error) {}
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link href="/">
            <a className="navbar-brand">
              <h4>PLUVA</h4>
            </a>
          </Link>

          {!sidenav ? (
            <button
              className="btn btn-outline-dark d-lg-none"
              onClick={() => setSidenav(true)}
            >
              <FaBars />
            </button>
          ) : (
            <button
              className="btn btn-outline-danger d-lg-none"
              onClick={() => setSidenav(false)}
            >
              <FaTimes />
            </button>
          )}

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mx-auto">
              <NavItem href="/">Home</NavItem>

              {!user?.isLoggedIn && (
                <>
                  <NavItem href="/login">Login</NavItem>

                  <NavItem href="/signup">Sign up</NavItem>
                </>
              )}

              {user?.isLoggedIn && (
                <NavItem href="/user">
                  <FaUser /> User ({user?.email})
                </NavItem>
              )}
            </ul>

            <ul className="navbar-nav ml-auto">
              <NavItem href="/">
                <FaGithub /> Github
              </NavItem>

              {user?.isLoggedIn && (
                <NavItem href="" onClick={handleLogout}>
                  Logout
                </NavItem>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <SideNavOverlay
        sideNavWidth={sideNavWidth}
        setSidenav={setSidenav}
        handleLogout={handleLogout}
      />
    </>
  );
}

export default Navbar;
