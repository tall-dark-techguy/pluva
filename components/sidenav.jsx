import Link from "next/link";
import useUser from "../utils/useUser";

export function SideNavOverlay(props) {
  const { user } = useUser();

  const hideNav = () => {
    props.setSidenav(false);
  };

  return (
    <div className={`sidenav ${props.sideNavWidth}`}>
      <div className="sidenav-wrapper mx-auto">
        <button
          className="btn btn-link text-danger close-btn"
          onClick={hideNav}
        >
          X
        </button>

        <div className="container">
          <h1 className="display-4 text-center">Pluva</h1>

          <ul className="list-group list-group-flush text-center lead">
            <li className="list-group-item">
              <Link href="/">
                <a className="text-dark" onClick={hideNav}>
                  Home
                </a>
              </Link>
            </li>

            {user?.isLoggedIn ? (
              <>
                <li className="list-group-item">
                  <Link href="/user">
                    <a className="text-dark">Account</a>
                  </Link>
                </li>

                <li className="list-group-item">
                  <Link href="">
                    <a
                      className="btn btn-outline-danger btn-block"
                      onClick={props.handleLogout}
                    >
                      Logout
                    </a>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="list-group-item btn-group">
                  <Link href="/login">
                    <a className="btn btn-outline-dark">Login</a>
                  </Link>

                  <Link href="/signup">
                    <a className="btn btn-success">Sign up</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
