// Protect pages - SSR

module.exports = async (req, res) => {
  const user = req.session.get("user");

  if (!user) {
    res.writeHead(302, { Location: "/login" });
    res.end();
    return { props: {} };
  }

  return {
    props: { user },
  };
};

// Usage:
// export const getServerSideProps = withSession(async ({ req, res }) => {
//   return pageSessionHandler(req, res);
// });
