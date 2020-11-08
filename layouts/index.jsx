import Head from "../components/head";
import Navbar from "../components/navbar";

function Layout({ children }) {
  return (
    <>
      <Head />
      <Navbar />
      {children}
    </>
  );
}

export default Layout;
